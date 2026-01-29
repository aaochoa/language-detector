/**
 * Type definitions for Language Detector
 */

/**
 * Supported language codes
 */
export type LanguageCode = 'es' | 'en' | 'fr';

/**
 * Detection result source
 */
export type DetectionSource = 'ml' | 'slang' | 'slang-override' | 'combined';

/**
 * Language detection result
 */
export interface DetectionResult {
   /** Detected language code */
   language: string;
   /** Confidence score (0-1) */
   confidence: number;
   /** Whether the detection is reliable (confidence > 0.7) */
   isReliable: boolean;
   /** Probability distribution across languages */
   probabilities?: Record<string, number>;
   /** Source of the detection */
   source?: DetectionSource;
}

/**
 * Slang detection result
 */
export interface SlangDetectionResult {
   /** Detected language */
   language: string;
   /** Confidence score */
   confidence: number;
   /** Match scores per language */
   scores: Record<string, number>;
}

/**
 * Naive Bayes prediction result
 */
export interface PredictionResult {
   /** Predicted label */
   label: string;
   /** Confidence score */
   confidence: number;
   /** Probability distribution */
   probabilities: Record<string, number>;
}

/**
 * TF-IDF Vectorizer options
 */
export interface VectorizerOptions {
   /** Minimum n-gram size (default: 2) */
   minN?: number;
   /** Maximum n-gram size (default: 4) */
   maxN?: number;
   /** Maximum number of features (default: 5000) */
   maxFeatures?: number;
}

/**
 * Serialized TF-IDF Vectorizer data
 */
export interface VectorizerData {
   minN: number;
   maxN: number;
   maxFeatures: number;
   vocabulary: Record<string, number>;
   idf: Record<string, number>;
}

/**
 * Serialized Naive Bayes Classifier data
 */
export interface ClassifierData {
   classPriors: Record<string, number>;
   featureMeans: Record<string, number[]>;
   featureVariances: Record<string, number[]>;
}

/**
 * Complete model data for serialization
 */
export interface ModelData {
   vectorizer: VectorizerData;
   classifier: ClassifierData;
   config?: Record<string, unknown>;
}

/**
 * N-gram frequency counts
 */
export type NgramCounts = Record<string, number>;

/**
 * Term frequencies
 */
export type TermFrequencies = Record<string, number>;

/**
 * Slang words dictionary
 */
export type SlangDictionary = Record<string, Set<string>>;
