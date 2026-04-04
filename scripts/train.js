/* eslint-disable no-console */
/**
 * Train the language detection model with batch processing
 *
 * Usage:
 *   npm run train                      # trains all sizes
 *   npm run train -- --size large      # trains a specific size
 *   npm run train:small / :medium / :large
 *
 * Outputs minified model files to models/language-model-{size}.min.json
 */

const fs = require('fs');
const path = require('path');
const { TfidfVectorizer, NaiveBayesClassifier, normalizeText, augmentText } = require('../dist');

// Per-size training configurations
const SIZE_CONFIGS = {
    small: {
        maxSamplesPerLanguage: 5000,
        batchSize: 1000,
        vectorizerOptions: { minN: 2, maxN: 4, maxFeatures: 1000 },
    },
    medium: {
        maxSamplesPerLanguage: 10000,
        batchSize: 2000,
        vectorizerOptions: { minN: 2, maxN: 5, maxFeatures: 3000 },
    },
    large: {
        maxSamplesPerLanguage: 15000,
        batchSize: 2000,
        vectorizerOptions: { minN: 2, maxN: 5, maxFeatures: 5000 },
    },
};

const LANGUAGES = ['es', 'en', 'fr', 'it', 'pt', 'de', 'nl'];
const TEST_SPLIT = 0.2;
const PROCESSED_DIR = path.join(__dirname, '../data/processed');
const MODELS_DIR = path.join(__dirname, '../models');

/**
 * Parse --size flag from argv. Returns array of sizes to train.
 * Defaults to all sizes when not specified.
 */
function parseSizeArg() {
    const sizeIdx = process.argv.indexOf('--size');
    if (sizeIdx !== -1) {
        const size = process.argv[sizeIdx + 1];
        if (!SIZE_CONFIGS[size]) {
            console.error(`Unknown size "${size}". Valid options: ${Object.keys(SIZE_CONFIGS).join(', ')}`);
            process.exit(1);
        }
        return [size];
    }
    return Object.keys(SIZE_CONFIGS);
}

function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function loadLanguageData(lang, maxSamples) {
    const filePath = path.join(PROCESSED_DIR, `${lang}.json`);

    if (!fs.existsSync(filePath)) {
        console.warn(`No data file found for ${lang}: ${filePath}`);
        return [];
    }

    let texts = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    texts = texts.sort(() => Math.random() - 0.5);

    if (maxSamples && texts.length > maxSamples) {
        texts = texts.slice(0, maxSamples);
    }

    console.log(`  Loaded ${texts.length} ${lang} samples`);
    return texts.map((text) => ({ text, lang }));
}

function collectTextsForVocabulary(maxSamplesPerLanguage) {
    const allTexts = [];
    const testData = { texts: [], labels: [] };

    LANGUAGES.forEach((lang) => {
        const samples = loadLanguageData(lang, maxSamplesPerLanguage);
        const splitIdx = Math.floor(samples.length * (1 - TEST_SPLIT));

        samples.slice(0, splitIdx).forEach((sample) => {
            const normalized = normalizeText(sample.text);
            if (normalized.length >= 3) {
                allTexts.push(normalized);
            }
        });

        samples.slice(splitIdx).forEach((sample) => {
            const normalized = normalizeText(sample.text);
            if (normalized.length >= 3) {
                testData.texts.push(normalized);
                testData.labels.push(lang);
            }
        });
    });

    console.log(`  Collected ${allTexts.length} texts for vocabulary`);
    console.log(`  Collected ${testData.texts.length} test samples`);

    return { vocabularyTexts: allTexts, testData };
}

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
                });
            });
        }
    });
}

function trainInBatches(vectorizer, maxSamplesPerLanguage, batchSize, maxFeatures) {
    console.log('\n  Training classifier in batches...');

    const stats = {
        classCounts: {},
        featureSums: {},
        totalSamples: 0,
    };

    LANGUAGES.forEach((lang) => {
        stats.classCounts[lang] = 0;
        stats.featureSums[lang] = new Array(maxFeatures).fill(0);
    });

    LANGUAGES.forEach((lang) => {
        const samples = loadLanguageData(lang, maxSamplesPerLanguage);
        const splitIdx = Math.floor(samples.length * (1 - TEST_SPLIT));
        const trainSamples = samples.slice(0, splitIdx);

        console.log(`    Processing ${lang}: ${trainSamples.length} training samples`);

        let batchStart = 0;
        while (batchStart < trainSamples.length) {
            const batch = trainSamples.slice(batchStart, batchStart + batchSize);
            processBatch(batch, lang, vectorizer, stats);
            batchStart += batchSize;
        }

        if (global.gc) {
            global.gc();
        }
    });

    console.log('\n  Building Multinomial NB classifier from statistics...');
    const classifier = new NaiveBayesClassifier();

    const classPriors = {};
    const featureWeights = {};
    const alpha = 1.0;

    LANGUAGES.forEach((lang) => {
        classPriors[lang] = stats.classCounts[lang] / stats.totalSamples;

        // Multinomial log-probabilities with Laplace smoothing
        const classTotal = stats.featureSums[lang].reduce((sum, val) => sum + val, 0);
        const denominator = classTotal + alpha * maxFeatures;

        featureWeights[lang] = stats.featureSums[lang].map(
            (count) => Math.log((count + alpha) / denominator),
        );
    });

    classifier._classPriors = classPriors;
    classifier._featureWeights = featureWeights;
    classifier._fitted = true;

    console.log(
        `  Trained on ${stats.totalSamples} samples across ${LANGUAGES.length} classes`,
    );

    return { classifier, totalSamples: stats.totalSamples };
}

function evaluateModel(classifier, vectorizer, texts, labels) {
    let correct = 0;
    const confusionMatrix = {};
    const perClassMetrics = {};

    LANGUAGES.forEach((lang) => {
        confusionMatrix[lang] = {};
        LANGUAGES.forEach((pred) => {
            confusionMatrix[lang][pred] = 0;
        });
        perClassMetrics[lang] = { tp: 0, fp: 0, fn: 0 };
    });

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

    Object.entries(perClassMetrics).forEach(([lang, metrics]) => {
        const precision = metrics.tp / (metrics.tp + metrics.fp) || 0;
        const recall = metrics.tp / (metrics.tp + metrics.fn) || 0;
        const f1 = (2 * (precision * recall)) / (precision + recall) || 0;

        perClassMetrics[lang].precision = precision;
        perClassMetrics[lang].recall = recall;
        perClassMetrics[lang].f1 = f1;
    });

    return { accuracy, confusionMatrix, perClassMetrics };
}

async function trainSize(size) {
    const config = SIZE_CONFIGS[size];
    const { maxSamplesPerLanguage, batchSize, vectorizerOptions } = config;

    console.log(`\n${'='.repeat(50)}`);
    console.log(`Training size: ${size.toUpperCase()}`);
    console.log(`  Languages: ${LANGUAGES.join(', ')}`);
    console.log(`  Max samples per language: ${maxSamplesPerLanguage}`);
    console.log(`  Max features: ${vectorizerOptions.maxFeatures}`);
    console.log(`  N-gram range: ${vectorizerOptions.minN}-${vectorizerOptions.maxN}`);

    console.log('\nPhase 1: Building vocabulary...');
    const { vocabularyTexts, testData } = collectTextsForVocabulary(maxSamplesPerLanguage);

    if (vocabularyTexts.length === 0) {
        console.error('\nNo training data found! Run: npm run prepare-data');
        throw new Error('No training data found. Run: npm run prepare-data');
    }

    console.log('\n  Fitting TF-IDF vectorizer...');
    const vectorizer = new TfidfVectorizer(vectorizerOptions);
    vectorizer.fit(vocabularyTexts);
    vocabularyTexts.length = 0;
    if (global.gc) global.gc();

    console.log('\nPhase 2: Training classifier...');
    const { classifier, totalSamples } = trainInBatches(
        vectorizer,
        maxSamplesPerLanguage,
        batchSize,
        vectorizerOptions.maxFeatures,
    );

    console.log('\nPhase 3: Evaluating model...');
    const metrics = evaluateModel(classifier, vectorizer, testData.texts, testData.labels);

    console.log(`\n  Accuracy: ${(metrics.accuracy * 100).toFixed(2)}%`);
    console.log('  Per-class metrics:');
    Object.entries(metrics.perClassMetrics).forEach(([lang, m]) => {
        console.log(
            `    ${lang}: P=${(m.precision * 100).toFixed(1)}% R=${(m.recall * 100).toFixed(1)}% F1=${(m.f1 * 100).toFixed(1)}%`,
        );
    });

    ensureDir(MODELS_DIR);

    const modelData = {
        size,
        vectorizer: vectorizer.toJSON(),
        classifier: classifier.toJSON(),
        config: { ...config, languages: LANGUAGES, testSplit: TEST_SPLIT },
        metrics: {
            accuracy: metrics.accuracy,
            perClassMetrics: metrics.perClassMetrics,
        },
        trainedAt: new Date().toISOString(),
        trainingSamples: totalSamples,
        testSamples: testData.texts.length,
    };

    const minifiedPath = path.join(MODELS_DIR, `language-model-${size}.min.json`);
    fs.writeFileSync(minifiedPath, JSON.stringify(modelData));

    const stats = fs.statSync(minifiedPath);
    console.log(`\n  Saved: ${minifiedPath}`);
    console.log(`  Model size: ${(stats.size / 1024).toFixed(2)} KB`);
}

async function train() {
    const sizes = parseSizeArg();

    console.log('=== Language Detector Training ===');
    console.log(`Sizes to train: ${sizes.join(', ')}`);

    for (const size of sizes) {
        await trainSize(size);
    }

    console.log('\n=== Training Complete ===');
}

train().catch((error) => {
    console.error('Training failed:', error);
    throw error;
});
