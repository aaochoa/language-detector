/**
 * Language Detector Module
 *
 * A Naive Bayes language detector for short, informal text
 * like SMS and chat messages.
 *
 * @example
 * import { getDetector } from 'language-detector';
 *
 * const detector = getDetector('./models/language-model.json');
 * const result = detector.detect('Hola, ¿cómo estás?');
 * console.log(result);
 * // { language: 'es', confidence: 0.95, isReliable: true, probabilities: { es: 0.95, en: 0.05 } }
 */

// Main exports
export { LanguageDetector, getDetector, resetDetector } from './inference/detector';

// For training
export { TfidfVectorizer } from './inference/tfidf-vectorizer';
export { NaiveBayesClassifier } from './inference/naive-bayes';

// Utilities
export { normalizeText, augmentText } from './utils/text-normalizer';
export { extractNgrams, countNgrams, getTermFrequencies } from './utils/ngram-extractor';

// Types
export type {
   LanguageCode,
   DetectionResult,
   DetectionSource,
   SlangDetectionResult,
   PredictionResult,
   VectorizerOptions,
   VectorizerData,
   ClassifierData,
   ModelData,
   NgramCounts,
   TermFrequencies,
   SlangDictionary,
} from './types';
