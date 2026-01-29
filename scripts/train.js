/* eslint-disable no-console */
/**
 * Train the language detection model
 *
 * Usage: npm run train
 */

const fs = require('fs');
const path = require('path');
const { TfidfVectorizer, NaiveBayesClassifier, normalizeText, augmentText } = require('../dist');

// Configuration
const CONFIG = {
   languages: ['es', 'en'],
   testSplit: 0.2,
   maxSamplesPerLanguage: 50000, // 50k per language = 100k total, fits in ~4GB RAM
   vectorizerOptions: {
      minN: 2,
      maxN: 4, // 4-gram for better accuracy
      maxFeatures: 3000, // Balance between accuracy and memory
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
 * Load training data from files
 */
function loadTrainingData() {
   const data = {};

   CONFIG.languages.forEach((lang) => {
      const filePath = path.join(PROCESSED_DIR, `${lang}.json`);

      if (fs.existsSync(filePath)) {
         let texts = JSON.parse(fs.readFileSync(filePath, 'utf8'));

         // Limit samples to prevent memory issues
         if (CONFIG.maxSamplesPerLanguage && texts.length > CONFIG.maxSamplesPerLanguage) {
            // Shuffle and take subset
            texts = texts.sort(() => Math.random() - 0.5).slice(0, CONFIG.maxSamplesPerLanguage);
            console.log(`Loaded ${texts.length} ${lang} samples (limited from ${texts.length})`);
         } else {
            console.log(`Loaded ${texts.length} ${lang} samples`);
         }
         data[lang] = texts;
      } else {
         console.warn(`No data file found for ${lang}: ${filePath}`);
         data[lang] = [];
      }
   });

   return data;
}

/**
 * Prepare training and test sets
 */
function prepareDatasets(dataByLanguage) {
   const trainTexts = [];
   const trainLabels = [];
   const testTexts = [];
   const testLabels = [];

   Object.entries(dataByLanguage).forEach(([lang, texts]) => {
      // Shuffle texts
      const shuffled = texts.sort(() => Math.random() - 0.5);

      // Split into train/test
      const splitIdx = Math.floor(shuffled.length * (1 - CONFIG.testSplit));
      const trainPortion = shuffled.slice(0, splitIdx);
      const testPortion = shuffled.slice(splitIdx);

      // Add to training set with augmentation
      trainPortion.forEach((text) => {
         const normalized = normalizeText(text);
         if (normalized.length >= 3) {
            const variations = augmentText(normalized, lang);
            variations.forEach((variation) => {
               trainTexts.push(variation);
               trainLabels.push(lang);
            });
         }
      });

      // Add to test set (no augmentation)
      testPortion.forEach((text) => {
         const normalized = normalizeText(text);
         if (normalized.length >= 3) {
            testTexts.push(normalized);
            testLabels.push(lang);
         }
      });
   });

   console.log(`Training samples: ${trainTexts.length}`);
   console.log(`Test samples: ${testTexts.length}`);

   return { trainTexts, trainLabels, testTexts, testLabels };
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
 * Main training function
 */
async function train() {
   console.log('=== Language Detector Training ===\n');

   // Load data
   console.log('Loading training data...');
   const dataByLanguage = loadTrainingData();

   // Check if we have enough data
   const totalSamples = Object.values(dataByLanguage).reduce((sum, arr) => sum + arr.length, 0);
   if (totalSamples === 0) {
      console.error('\nNo training data found!');
      console.log('Run: npm run prepare-data');
      throw new Error('No training data found. Run: npm run prepare-data');
   }

   // Prepare datasets
   console.log('\nPreparing datasets...');
   const { trainTexts, trainLabels, testTexts, testLabels } = prepareDatasets(dataByLanguage);

   // Train vectorizer
   console.log('\nTraining TF-IDF vectorizer...');
   const vectorizer = new TfidfVectorizer(CONFIG.vectorizerOptions);
   const trainVectors = vectorizer.fitTransform(trainTexts);

   // Train classifier
   console.log('\nTraining Naive Bayes classifier...');
   const classifier = new NaiveBayesClassifier();
   classifier.fit(trainVectors, trainLabels);

   // Evaluate
   console.log('\nEvaluating model...');
   const metrics = evaluateModel(classifier, vectorizer, testTexts, testLabels);

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
      trainingSamples: trainTexts.length,
      testSamples: testTexts.length,
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
