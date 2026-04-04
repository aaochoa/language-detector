/* eslint-disable no-console */
/**
 * Language Detector - Main detection class
 */

import * as fs from 'fs';
import * as path from 'path';
import { TfidfVectorizer } from './tfidf-vectorizer';
import { NaiveBayesClassifier } from './naive-bayes';
import { normalizeText } from '../utils/text-normalizer';
import { SLANG_WORDS } from '../utils/slang-dictionaries';
import type {
    DetectionResult,
    SlangDetectionResult,
    ModelData,
    ModelSize,
    PredictionResult,
} from '../types';

// Constants
const SHORT_TEXT_THRESHOLD = 15;
const MIN_ML_TEXT_LENGTH = 3;
const SLANG_MIN_CONFIDENCE = 0.5;
const ML_LOW_CONFIDENCE_THRESHOLD = 0.6;
const RELIABLE_CONFIDENCE_THRESHOLD = 0.7;

// All supported language codes for slang detection
const ALL_SLANG_LANGUAGES = ['es', 'en', 'fr', 'it', 'pt', 'de', 'nl'];

/**
 * Check if confidence is above reliable threshold
 */
function isReliable(confidence: number): boolean {
    return confidence > RELIABLE_CONFIDENCE_THRESHOLD;
}

/**
 * Add slang scores for a language if word/text matches
 */
function addSlangScore(
    scores: Record<string, number>,
    lang: string,
    text: string,
    points: number,
): void {
    if (SLANG_WORDS[lang]?.has(text)) {
        scores[lang] += points;
    }
}

/**
 * Detect language based on slang word matches
 * @param text - Text to check
 * @param allowedLanguages - Optional list of languages to consider (null = all)
 * @returns Slang detection result or null
 */
function detectBySlang(
    text: string,
    allowedLanguages: string[] | null = null,
): SlangDetectionResult | null {
    const lowerText = text.toLowerCase();
    const normalizedLower = normalizeText(text).toLowerCase();
    const languagesToCheck = allowedLanguages || ALL_SLANG_LANGUAGES;

    // Initialize scores
    const scores: Record<string, number> = Object.fromEntries(
        languagesToCheck.map((lang) => [lang, 0]),
    );

    // Score individual words (1 point each)
    const words = lowerText.split(/\s+/);
    words.forEach((word) => {
        languagesToCheck.forEach((lang) => {
            addSlangScore(scores, lang, word, 1);
        });
    });

    // Score full text matches (2 points - multi-word slang)
    [lowerText, normalizedLower].forEach((txt) => {
        languagesToCheck.forEach((lang) => {
            addSlangScore(scores, lang, txt, 2);
        });
    });

    const total = Object.values(scores).reduce((sum, val) => sum + val, 0);
    if (total === 0) {
        return null;
    }

    // Find winner - reduce also gives us the max score
    const [winner, maxScore] = Object.entries(scores).reduce((a, b) => (b[1] > a[1] ? b : a));

    return { language: winner, confidence: maxScore / total, scores };
}

/**
 * Create a default/empty detection result
 */
function createEmptyResult(allowedLanguages: string[] | null = null): DetectionResult {
    return { language: allowedLanguages?.[0] ?? 'en', confidence: 0, isReliable: false };
}

/**
 * Create a slang-based detection result
 */
function createSlangResult(
    slangResult: SlangDetectionResult,
    source: DetectionResult['source'],
    // eslint-disable-next-line default-param-last
    confidenceMultiplier = 1,
    probabilities?: Record<string, number>,
): DetectionResult {
    const confidence = slangResult.confidence * confidenceMultiplier;
    return {
        language: slangResult.language,
        confidence,
        isReliable: isReliable(confidence),
        source,
        ...(probabilities && { probabilities }),
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
    const confidence = (prediction.confidence + slangResult.confidence) / 2;
    return {
        language: slangResult.language,
        confidence,
        isReliable: isReliable(confidence),
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
        isReliable: isReliable(prediction.confidence),
        probabilities: prediction.probabilities,
        source: 'ml',
    };
}

/**
 * Handle short text detection (slang priority)
 */
function detectShortText(
    text: string,
    allowedLanguages: string[] | null = null,
): DetectionResult | null {
    const slangResult = detectBySlang(text, allowedLanguages);
    if (slangResult && slangResult.confidence >= SLANG_MIN_CONFIDENCE) {
        return createSlangResult(slangResult, 'slang');
    }
    return null;
}

/**
 * Handle very short text (< 3 chars normalized)
 */
function detectVeryShortText(
    text: string,
    allowedLanguages: string[] | null = null,
): DetectionResult {
    const slangResult = detectBySlang(text, allowedLanguages);
    if (slangResult) {
        // Very short text gets reduced confidence
        return createSlangResult(slangResult, 'slang', 0.5);
    }
    return createEmptyResult(allowedLanguages);
}

/**
 * Options for setAllowedLanguages
 */
export interface AllowedLanguagesOptions {
    /**
     * When true, only computes probabilities for allowed languages (faster).
     * When false (default), computes all probabilities to detect "neither" case.
     * @default false
     */
    fastMode?: boolean;
}

export class LanguageDetector {
    private _vectorizer: TfidfVectorizer | null;
    private _classifier: NaiveBayesClassifier | null;
    private _loaded: boolean;
    private _config: Record<string, unknown> | null;
    private _allowedLanguages: string[] | null;
    private _fastMode: boolean;

    constructor() {
        this._vectorizer = null;
        this._classifier = null;
        this._loaded = false;
        this._config = null;
        this._allowedLanguages = null;
        this._fastMode = false;
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
     * Get the currently allowed languages for detection
     * Returns null if all languages are allowed
     */
    get allowedLanguages(): string[] | null {
        return this._allowedLanguages;
    }

    /**
     * Get whether fast mode is enabled
     * Fast mode skips "neither" detection for better performance
     */
    get fastMode(): boolean {
        return this._fastMode;
    }

    /**
     * Limit detection to specific languages only
     * When set, the detector will only return one of these languages
     * @param languages - Array of language codes to allow (e.g., ['en', 'es'])
     * @param options - Optional settings
     * @param options.fastMode - When true, skips "neither" detection for ~3x speedup (default: false)
     * @returns this for chaining
     */
    setAllowedLanguages(languages: string[], options: AllowedLanguagesOptions = {}): this {
        if (!Array.isArray(languages) || languages.length === 0) {
            throw new Error('allowedLanguages must be a non-empty array of language codes');
        }

        // Validate against supported languages if model is loaded
        if (this._loaded) {
            const supported = this.supportedLanguages;
            const invalid = languages.filter((lang) => !supported.includes(lang));
            if (invalid.length > 0) {
                console.warn(
                    `Warning: Some languages are not in the model: ${invalid.join(', ')}. ` +
                        `Supported: ${supported.join(', ')}`,
                );
            }
        }

        this._allowedLanguages = [...languages];
        this._fastMode = options.fastMode ?? false;
        return this;
    }

    /**
     * Clear language restrictions, allowing all supported languages
     * Also resets fastMode to false
     * @returns this for chaining
     */
    clearAllowedLanguages(): this {
        this._allowedLanguages = null;
        this._fastMode = false;
        return this;
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
            return createEmptyResult(this._allowedLanguages);
        }

        const trimmedText = text.trim();
        const normalized = normalizeText(text);

        // Short text: prioritize slang detection
        if (trimmedText.length <= SHORT_TEXT_THRESHOLD) {
            const result = detectShortText(trimmedText, this._allowedLanguages);
            if (result) {
                return result;
            }
        }

        // Very short text: slang only
        if (normalized.length < MIN_ML_TEXT_LENGTH) {
            return detectVeryShortText(trimmedText, this._allowedLanguages);
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
        const prediction = this._classifier!.predict(
            vector,
            this._allowedLanguages ?? undefined,
            this._fastMode,
        );
        const slangResult = detectBySlang(trimmedText, this._allowedLanguages);

        // Check if slang should override ML
        if (slangResult && shouldSlangOverride(slangResult, prediction)) {
            return createSlangResult(slangResult, 'slang-override', 1, prediction.probabilities);
        }

        // Low ML confidence: combine with slang
        if (
            prediction.confidence < ML_LOW_CONFIDENCE_THRESHOLD &&
            slangResult &&
            slangResult.confidence > SLANG_MIN_CONFIDENCE
        ) {
            return combineMLAndSlang(prediction, slangResult);
        }

        return createMLResult(prediction);
    }
}

// Singleton instance per model size
const _detectorInstances: Partial<Record<ModelSize, LanguageDetector>> = {};

/**
 * Resolve the bundled model path for a given size.
 * Works whether running from source (models/) or installed (dist/models/).
 */
export function getModelPath(size: ModelSize = 'large'): string {
    return path.join(__dirname, '..', 'models', `language-model-${size}.min.json`);
}

/**
 * Get or create a detector instance for the given model size.
 * Uses the bundled model from the package's own models/ directory.
 */
export function getDetector(size?: ModelSize): LanguageDetector;
/**
 * Get or create a detector instance from an explicit file path.
 * @deprecated Pass a ModelSize instead: getDetector('large')
 */
export function getDetector(modelPath: string): LanguageDetector;
export function getDetector(sizeOrPath: ModelSize | string = 'large'): LanguageDetector {
    const isSize = sizeOrPath === 'small' || sizeOrPath === 'medium' || sizeOrPath === 'large';

    if (isSize) {
        const size = sizeOrPath as ModelSize;
        if (!_detectorInstances[size]) {
            _detectorInstances[size] = new LanguageDetector();
            _detectorInstances[size]!.loadFromFile(getModelPath(size));
        }
        return _detectorInstances[size]!;
    }

    // Legacy path-based call: use a shared slot keyed off the path
    if (!_detectorInstances.large) {
        _detectorInstances.large = new LanguageDetector();
        _detectorInstances.large.loadFromFile(sizeOrPath);
    }
    return _detectorInstances.large;
}

/**
 * Reset singleton instances (useful for testing).
 * Pass a size to reset only that instance, or omit to reset all.
 */
export function resetDetector(size?: ModelSize): void {
    if (size) {
        delete _detectorInstances[size];
    } else {
        (Object.keys(_detectorInstances) as ModelSize[]).forEach((s) => {
            delete _detectorInstances[s];
        });
    }
}
