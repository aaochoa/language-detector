/* eslint-disable no-console */
/**
 * Train the language detection model with batch processing
 *
 * Usage: npm run train
 *
 * This version uses batch processing to reduce memory usage:
 * 1. Loads data one language at a time
 * 2. Builds vocabulary incrementally
 * 3. Trains classifier in batches
 */

const fs = require('fs');
const path = require('path');
const { TfidfVectorizer, NaiveBayesClassifier, normalizeText, augmentText } = require('../dist');

// Configuration
const CONFIG = {
   languages: ['es', 'en', 'fr', 'it', 'pt', 'de'],
   testSplit: 0.2,
   maxSamplesPerLanguage: 15000, // Can use more samples with batch processing
   batchSize: 2000, // Process this many samples at a time
   vectorizerOptions: {
      minN: 2,
      maxN: 5, // 5-gram for better language discrimination
      maxFeatures: 5000, // Larger vocabulary for better accuracy
   },
};

const PROCESSED_DIR = path.join(__dirname, '../data/processed');
const MODELS_DIR = path.join(__dirname, '../models');

/**
 * Ensure directory exists
 */
function ensureDir(dirPath) {
   if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
   }
}

/**
 * Load and shuffle samples for a single language
 * @param {string} lang - Language code
 * @param {number} maxSamples - Maximum samples to load
 * @returns {Array<{text: string, lang: string}>} Array of samples
 */
function loadLanguageData(lang, maxSamples) {
   const filePath = path.join(PROCESSED_DIR, `${lang}.json`);

   if (!fs.existsSync(filePath)) {
      console.warn(`No data file found for ${lang}: ${filePath}`);
      return [];
   }

   let texts = JSON.parse(fs.readFileSync(filePath, 'utf8'));

   // Shuffle
   texts = texts.sort(() => Math.random() - 0.5);

   // Limit samples
   if (maxSamples && texts.length > maxSamples) {
      texts = texts.slice(0, maxSamples);
   }

   console.log(`Loaded ${texts.length} ${lang} samples`);

   return texts.map((text) => ({ text, lang }));
}

/**
 * Collect all texts for vocabulary building (first pass)
 */
function collectTextsForVocabulary() {
   const allTexts = [];
   const testData = { texts: [], labels: [] };

   CONFIG.languages.forEach((lang) => {
      const samples = loadLanguageData(lang, CONFIG.maxSamplesPerLanguage);
      const splitIdx = Math.floor(samples.length * (1 - CONFIG.testSplit));

      // Process training portion
      samples.slice(0, splitIdx).forEach((sample) => {
         const normalized = normalizeText(sample.text);
         if (normalized.length >= 3) {
            allTexts.push(normalized);
         }
      });

      // Collect test data
      samples.slice(splitIdx).forEach((sample) => {
         const normalized = normalizeText(sample.text);
         if (normalized.length >= 3) {
            testData.texts.push(normalized);
            testData.labels.push(lang);
         }
      });
   });

   console.log(`Collected ${allTexts.length} texts for vocabulary`);
   console.log(`Collected ${testData.texts.length} test samples`);

   return { vocabularyTexts: allTexts, testData };
}

/**
 * Process a single batch of samples
 */
function processBatch(batch, lang, vectorizer, stats) {
   batch.forEach((sample) => {
      const normalized = normalizeText(sample.text);
      if (normalized.length >= 3) {
         const variations = augmentText(normalized, lang);
         variations.forEach((variation) => {
            const vector = vectorizer.transform(variation);

            stats.classCounts[lang] += 1;
            stats.totalSamples += 1;

            vector.forEach((value, idx) => {
               stats.featureSums[lang][idx] += value;
               stats.featureSumSquares[lang][idx] += value * value;
            });
         });
      }
   });
}

/**
 * Train classifier in batches to reduce memory usage
 */
function trainInBatches(vectorizer) {
   console.log('\nTraining classifier in batches...');

   // Accumulate statistics for Naive Bayes
   const stats = {
      classCounts: {},
      featureSums: {},
      featureSumSquares: {},
      totalSamples: 0,
   };

   CONFIG.languages.forEach((lang) => {
      stats.classCounts[lang] = 0;
      stats.featureSums[lang] = new Array(CONFIG.vectorizerOptions.maxFeatures).fill(0);
      stats.featureSumSquares[lang] = new Array(CONFIG.vectorizerOptions.maxFeatures).fill(0);
   });

   // Process each language
   CONFIG.languages.forEach((lang) => {
      const samples = loadLanguageData(lang, CONFIG.maxSamplesPerLanguage);
      const splitIdx = Math.floor(samples.length * (1 - CONFIG.testSplit));
      const trainSamples = samples.slice(0, splitIdx);

      console.log(`  Processing ${lang}: ${trainSamples.length} training samples`);

      // Process in batches
      let batchStart = 0;
      while (batchStart < trainSamples.length) {
         const batch = trainSamples.slice(batchStart, batchStart + CONFIG.batchSize);
         processBatch(batch, lang, vectorizer, stats);
         batchStart += CONFIG.batchSize;
      }

      if (global.gc) {
         global.gc();
      }
   });

   // Build classifier from accumulated statistics
   console.log('\nBuilding classifier from statistics...');
   const classifier = new NaiveBayesClassifier();

   // Compute means and variances
   const featureMeans = {};
   const featureVariances = {};
   const classPriors = {};

   CONFIG.languages.forEach((lang) => {
      const count = stats.classCounts[lang];
      classPriors[lang] = count / stats.totalSamples;

      featureMeans[lang] = stats.featureSums[lang].map((sum) => sum / count);
      featureVariances[lang] = stats.featureSumSquares[lang].map((sumSq, idx) => {
         const mean = featureMeans[lang][idx];
         const variance = sumSq / count - mean * mean;
         // Add smoothing to prevent zero variance
         return Math.max(variance, 1e-9);
      });
   });

   // Load computed statistics into classifier
   classifier._classPriors = classPriors;
   classifier._featureMeans = featureMeans;
   classifier._featureVariances = featureVariances;
   classifier._classes = CONFIG.languages;
   classifier._fitted = true;

   console.log(
      `Trained on ${stats.totalSamples} samples across ${CONFIG.languages.length} classes`,
   );

   return { classifier, totalSamples: stats.totalSamples };
}

/**
 * Evaluate model accuracy
 */
function evaluateModel(classifier, vectorizer, texts, labels) {
   let correct = 0;
   const confusionMatrix = {};
   const perClassMetrics = {};

   // Initialize confusion matrix
   CONFIG.languages.forEach((lang) => {
      confusionMatrix[lang] = {};
      CONFIG.languages.forEach((pred) => {
         confusionMatrix[lang][pred] = 0;
      });
      perClassMetrics[lang] = { tp: 0, fp: 0, fn: 0 };
   });

   // Evaluate each sample
   texts.forEach((text, idx) => {
      const vector = vectorizer.transform(text);
      const prediction = classifier.predict(vector);
      const trueLabel = labels[idx];

      confusionMatrix[trueLabel][prediction.label] += 1;

      if (prediction.label === trueLabel) {
         correct += 1;
         perClassMetrics[trueLabel].tp += 1;
      } else {
         perClassMetrics[trueLabel].fn += 1;
         if (perClassMetrics[prediction.label]) {
            perClassMetrics[prediction.label].fp += 1;
         }
      }
   });

   const accuracy = correct / texts.length;

   // Compute precision, recall, F1 per class
   Object.entries(perClassMetrics).forEach(([lang, metrics]) => {
      const precision = metrics.tp / (metrics.tp + metrics.fp) || 0;
      const recall = metrics.tp / (metrics.tp + metrics.fn) || 0;
      const f1 = (2 * (precision * recall)) / (precision + recall) || 0;

      perClassMetrics[lang].precision = precision;
      perClassMetrics[lang].recall = recall;
      perClassMetrics[lang].f1 = f1;
   });

   return {
      accuracy,
      confusionMatrix,
      perClassMetrics,
   };
}

/**
 * Main training function with batch processing
 */
async function train() {
   console.log('=== Language Detector Training (Batch Mode) ===\n');
   console.log(`Configuration:`);
   console.log(`  Languages: ${CONFIG.languages.join(', ')}`);
   console.log(`  Max samples per language: ${CONFIG.maxSamplesPerLanguage}`);
   console.log(`  Batch size: ${CONFIG.batchSize}`);
   console.log(`  Max features: ${CONFIG.vectorizerOptions.maxFeatures}`);
   console.log(
      `  Test split: ${CONFIG.testSplit * 100}%`,
      `  N-gram range: ${CONFIG.vectorizerOptions.minN}-${CONFIG.vectorizerOptions.maxN}\n`,
   );

   // Phase 1: Collect texts for vocabulary building
   console.log('Phase 1: Building vocabulary...');
   const { vocabularyTexts, testData } = collectTextsForVocabulary();

   if (vocabularyTexts.length === 0) {
      console.error('\nNo training data found!');
      console.log('Run: npm run prepare-data');
      throw new Error('No training data found. Run: npm run prepare-data');
   }

   // Train vectorizer on collected texts
   console.log('\nFitting TF-IDF vectorizer...');
   const vectorizer = new TfidfVectorizer(CONFIG.vectorizerOptions);
   vectorizer.fit(vocabularyTexts);

   // Free vocabulary texts memory
   vocabularyTexts.length = 0;
   if (global.gc) {
      global.gc();
   }

   // Phase 2: Train classifier in batches
   console.log('\nPhase 2: Training classifier...');
   const { classifier, totalSamples } = trainInBatches(vectorizer);

   // Phase 3: Evaluate
   console.log('\nPhase 3: Evaluating model...');
   const metrics = evaluateModel(classifier, vectorizer, testData.texts, testData.labels);

   console.log(`\nAccuracy: ${(metrics.accuracy * 100).toFixed(2)}%`);
   console.log('\nPer-class metrics:');
   Object.entries(metrics.perClassMetrics).forEach(([lang, m]) => {
      console.log(
         `  ${lang}: P=${(m.precision * 100).toFixed(1)}% R=${(m.recall * 100).toFixed(1)}% F1=${(m.f1 * 100).toFixed(1)}%`,
      );
   });

   console.log('\nConfusion Matrix:');
   console.log('Actual \\ Predicted\t', Object.keys(metrics.confusionMatrix).join('\t'));
   Object.entries(metrics.confusionMatrix).forEach(([actual, predictions]) => {
      const row = Object.values(predictions).join('\t');
      console.log(`${actual}\t\t\t${row}`);
   });

   // Save model
   ensureDir(MODELS_DIR);

   const modelData = {
      vectorizer: vectorizer.toJSON(),
      classifier: classifier.toJSON(),
      config: CONFIG,
      metrics: {
         accuracy: metrics.accuracy,
         perClassMetrics: metrics.perClassMetrics,
      },
      trainedAt: new Date().toISOString(),
      trainingSamples: totalSamples,
      testSamples: testData.texts.length,
   };

   const modelPath = path.join(MODELS_DIR, 'language-model.json');
   fs.writeFileSync(modelPath, JSON.stringify(modelData, null, 2));
   console.log(`\nModel saved to: ${modelPath}`);

   // Also save minified version for production
   const minifiedPath = path.join(MODELS_DIR, 'language-model.min.json');
   fs.writeFileSync(minifiedPath, JSON.stringify(modelData));
   console.log(`Minified model saved to: ${minifiedPath}`);

   const stats = fs.statSync(minifiedPath);
   console.log(`Model size: ${(stats.size / 1024).toFixed(2)} KB`);

   console.log('\n=== Training Complete ===');
}

train().catch((error) => {
   console.error('Training failed:', error);
   throw error;
});
