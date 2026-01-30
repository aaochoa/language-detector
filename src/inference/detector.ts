/* eslint-disable no-console */
/**
 * Language Detector - Main detection class
 */

import * as fs from 'fs';
import { TfidfVectorizer } from './tfidf-vectorizer';
import { NaiveBayesClassifier } from './naive-bayes';
import { normalizeText } from '../utils/text-normalizer';
import { SLANG_WORDS } from '../utils/slang-dictionaries';
import type { DetectionResult, SlangDetectionResult, ModelData, PredictionResult } from '../types';

// Constants
const SHORT_TEXT_THRESHOLD = 15;
const MIN_ML_TEXT_LENGTH = 3;
const SLANG_MIN_CONFIDENCE = 0.5;
const ML_LOW_CONFIDENCE_THRESHOLD = 0.6;
const RELIABLE_CONFIDENCE_THRESHOLD = 0.7;

/**
 * Detect language based on slang word matches
 * @param text - Text to check
 * @returns Slang detection result or null
 */
function detectBySlang(text: string): SlangDetectionResult | null {
   const lowerText = text.toLowerCase();
   const normalizedLower = normalizeText(text).toLowerCase();
   const words = lowerText.split(/\s+/);
   const scores: Record<string, number> = { es: 0, en: 0, fr: 0, it: 0, pt: 0, de: 0 };

   // Check each word against slang dictionaries
   words.forEach((word) => {
      if (SLANG_WORDS.es?.has(word)) {
         scores.es += 1;
      }
      if (SLANG_WORDS.en?.has(word)) {
         scores.en += 1;
      }
      if (SLANG_WORDS.fr?.has(word)) {
         scores.fr += 1;
      }
      if (SLANG_WORDS.it?.has(word)) {
         scores.it += 1;
      }
      if (SLANG_WORDS.pt?.has(word)) {
         scores.pt += 1;
      }
      if (SLANG_WORDS.de?.has(word)) {
         scores.de += 1;
      }
   });

   // Check entire text for multi-word slang (both raw and normalized)
   const textsToCheck = [lowerText, normalizedLower];
   textsToCheck.forEach((txt) => {
      if (SLANG_WORDS.es?.has(txt)) {
         scores.es += 2;
      }
      if (SLANG_WORDS.en?.has(txt)) {
         scores.en += 2;
      }
      if (SLANG_WORDS.fr?.has(txt)) {
         scores.fr += 2;
      }
      if (SLANG_WORDS.it?.has(txt)) {
         scores.it += 2;
      }
      if (SLANG_WORDS.pt?.has(txt)) {
         scores.pt += 2;
      }
      if (SLANG_WORDS.de?.has(txt)) {
         scores.de += 2;
      }
   });

   const total = scores.es + scores.en + scores.fr + scores.it + scores.pt + scores.de;
   if (total === 0) {
      return null;
   }

   // Find language with highest score
   const winner = Object.entries(scores).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
   const confidence =
      Math.max(scores.es, scores.en, scores.fr, scores.it, scores.pt, scores.de) / total;

   return { language: winner, confidence, scores };
}

/**
 * Create a default/empty detection result
 */
function createEmptyResult(): DetectionResult {
   return { language: 'en', confidence: 0, isReliable: false };
}

/**
 * Create a slang-based detection result
 */
function createSlangResult(slangResult: SlangDetectionResult, source: string): DetectionResult {
   return {
      language: slangResult.language,
      confidence: slangResult.confidence,
      isReliable: slangResult.confidence > RELIABLE_CONFIDENCE_THRESHOLD,
      source: source as DetectionResult['source'],
   };
}

/**
 * Check if slang should override ML prediction
 */
function shouldSlangOverride(
   slangResult: SlangDetectionResult,
   prediction: PredictionResult,
): boolean {
   if (slangResult.language === prediction.label) {
      return false;
   }

   const slangStrength = slangResult.scores[slangResult.language];
   const opposingStrength = slangResult.scores[prediction.label] || 0;

   return slangStrength >= 2 && slangStrength > opposingStrength + 1;
}

/**
 * Combine ML and slang signals for low-confidence predictions
 */
function combineMLAndSlang(
   prediction: PredictionResult,
   slangResult: SlangDetectionResult,
): DetectionResult {
   const combinedConfidence = (prediction.confidence + slangResult.confidence) / 2;
   return {
      language: slangResult.language,
      confidence: combinedConfidence,
      isReliable: combinedConfidence > RELIABLE_CONFIDENCE_THRESHOLD,
      probabilities: prediction.probabilities,
      source: 'combined',
   };
}

/**
 * Create ML-based detection result
 */
function createMLResult(prediction: PredictionResult): DetectionResult {
   return {
      language: prediction.label,
      confidence: prediction.confidence,
      isReliable: prediction.confidence > RELIABLE_CONFIDENCE_THRESHOLD,
      probabilities: prediction.probabilities,
      source: 'ml',
   };
}

/**
 * Handle short text detection (slang priority)
 */
function detectShortText(text: string): DetectionResult | null {
   const slangResult = detectBySlang(text);
   if (slangResult && slangResult.confidence >= SLANG_MIN_CONFIDENCE) {
      return createSlangResult(slangResult, 'slang');
   }
   return null;
}

/**
 * Handle very short text (< 3 chars normalized)
 */
function detectVeryShortText(text: string): DetectionResult {
   const slangResult = detectBySlang(text);
   if (slangResult) {
      return {
         language: slangResult.language,
         confidence: slangResult.confidence * 0.5,
         isReliable: false,
         source: 'slang',
      };
   }
   return createEmptyResult();
}

export class LanguageDetector {
   private _vectorizer: TfidfVectorizer | null;
   private _classifier: NaiveBayesClassifier | null;
   private _loaded: boolean;
   private _config: Record<string, unknown> | null;

   constructor() {
      this._vectorizer = null;
      this._classifier = null;
      this._loaded = false;
      this._config = null;
   }

   get isLoaded(): boolean {
      return this._loaded;
   }

   get supportedLanguages(): string[] {
      if (!this._loaded || !this._classifier) {
         return [];
      }
      return this._classifier.classes;
   }

   /**
    * Load model from JSON data
    */
   loadModel(modelData: ModelData): this {
      if (!modelData?.vectorizer || !modelData?.classifier) {
         throw new Error('Invalid model data: missing vectorizer or classifier');
      }

      this._vectorizer = TfidfVectorizer.fromJSON(modelData.vectorizer);
      this._classifier = NaiveBayesClassifier.fromJSON(modelData.classifier);
      this._config = modelData.config ?? {};
      this._loaded = true;

      console.log(`Language Detector loaded: ${this.supportedLanguages.join(', ')}`);
      return this;
   }

   /**
    * Load model from file path
    */
   loadFromFile(filePath: string): this {
      const modelData: ModelData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return this.loadModel(modelData);
   }

   /**
    * Detect language of text
    */
   detect(text: string | null | undefined): DetectionResult {
      this._ensureModelLoaded();

      if (!text || typeof text !== 'string' || text.trim().length === 0) {
         return createEmptyResult();
      }

      const trimmedText = text.trim();
      const normalized = normalizeText(text);

      // Short text: prioritize slang detection
      if (trimmedText.length <= SHORT_TEXT_THRESHOLD) {
         const result = detectShortText(trimmedText);
         if (result) {
            return result;
         }
      }

      // Very short text: slang only
      if (normalized.length < MIN_ML_TEXT_LENGTH) {
         return detectVeryShortText(trimmedText);
      }

      // ML-based detection with slang fallback
      return this._detectWithML(trimmedText, normalized);
   }

   /**
    * Detect language for multiple texts
    */
   detectBatch(texts: string[]): DetectionResult[] {
      return texts.map((text) => this.detect(text));
   }

   /**
    * Ensure model is loaded before detection
    */
   private _ensureModelLoaded(): void {
      if (!this._loaded || !this._vectorizer || !this._classifier) {
         throw new Error('Model must be loaded before detection');
      }
   }

   /**
    * ML-based detection with slang override/fallback
    */
   private _detectWithML(trimmedText: string, normalized: string): DetectionResult {
      const vector = this._vectorizer!.transform(normalized);
      const prediction = this._classifier!.predict(vector);
      const slangResult = detectBySlang(trimmedText);

      // Check if slang should override ML
      if (slangResult && shouldSlangOverride(slangResult, prediction)) {
         return {
            ...createSlangResult(slangResult, 'slang-override'),
            probabilities: prediction.probabilities,
         };
      }

      // Low ML confidence: combine with slang
      if (prediction.confidence < ML_LOW_CONFIDENCE_THRESHOLD) {
         if (slangResult && slangResult.confidence > SLANG_MIN_CONFIDENCE) {
            return combineMLAndSlang(prediction, slangResult);
         }
      }

      return createMLResult(prediction);
   }
}

// Singleton instance for reuse
let _detectorInstance: LanguageDetector | null = null;

/**
 * Get or create detector instance
 */
export function getDetector(modelPath: string): LanguageDetector {
   if (!_detectorInstance) {
      _detectorInstance = new LanguageDetector();
      _detectorInstance.loadFromFile(modelPath);
   }
   return _detectorInstance;
}

/**
 * Reset singleton instance (for testing)
 */
export function resetDetector(): void {
   _detectorInstance = null;
}
