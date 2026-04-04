/* eslint-disable no-console */
/**
 * Multinomial Naive Bayes Classifier for language detection
 *
 * Models the log-probability of each feature given each class,
 * using Laplace-smoothed feature counts. Designed for sparse
 * TF-IDF / count vectors from character n-grams.
 */

import type { ClassifierData, PredictionResult } from '../types';

// Laplace smoothing parameter
const ALPHA = 1.0;

/**
 * Group vectors by their labels
 */
function groupVectorsByLabel(
    vectors: number[][],
    labels: string[],
): { labelCounts: Record<string, number>; featuresByLabel: Record<string, number[][]> } {
    const labelCounts: Record<string, number> = {};
    const featuresByLabel: Record<string, number[][]> = {};

    labels.forEach((label, idx) => {
        labelCounts[label] = (labelCounts[label] || 0) + 1;
        if (!featuresByLabel[label]) {
            featuresByLabel[label] = [];
        }
        featuresByLabel[label].push(vectors[idx]);
    });

    return { labelCounts, featuresByLabel };
}

/**
 * Sum feature values across all vectors for a set of documents
 */
function sumFeatures(labelVectors: number[][]): number[] {
    const numFeatures = labelVectors[0].length;
    const sums = new Array<number>(numFeatures).fill(0);

    labelVectors.forEach((vector) => {
        vector.forEach((val, i) => {
            sums[i] += val;
        });
    });

    return sums;
}

/**
 * Compute multinomial log-probabilities for a class:
 * logProb[i] = log((classSums[i] + alpha) / (classTotal + alpha * nFeatures))
 */
function computeMultinomialLogProbs(classSums: number[], nFeatures: number): number[] {
    const classTotal = classSums.reduce((sum, val) => sum + val, 0);
    const denominator = classTotal + ALPHA * nFeatures;

    return classSums.map((count) => Math.log((count + ALPHA) / denominator));
}

/**
 * Find the best label from scores
 */
function findBestLabel(scores: Record<string, number>): string {
    let bestLabel: string | null = null;
    let bestScore = -Infinity;

    Object.entries(scores).forEach(([label, score]) => {
        if (score > bestScore) {
            bestScore = score;
            bestLabel = label;
        }
    });

    return bestLabel!;
}

/**
 * Filter scores to only include allowed classes
 */
function filterScores(
    scores: Record<string, number>,
    allowedClasses: string[],
): Record<string, number> {
    const filtered: Record<string, number> = {};
    allowedClasses.forEach((cls) => {
        if (cls in scores) {
            filtered[cls] = scores[cls];
        }
    });
    return filtered;
}

/**
 * Convert scores to normalized probabilities using softmax
 */
function normalizeProbabilities(scores: Record<string, number>): Record<string, number> {
    const maxScore = Math.max(...Object.values(scores));
    const expScores: Record<string, number> = {};
    let sumExp = 0;

    Object.entries(scores).forEach(([label, score]) => {
        expScores[label] = Math.exp(score - maxScore);
        sumExp += expScores[label];
    });

    return Object.fromEntries(
        Object.entries(expScores).map(([label, exp]) => [label, exp / sumExp]),
    );
}

/**
 * Create a fallback prediction result when no valid classes found
 */
function createFallbackResult(fallbackLabel: string): PredictionResult {
    return { label: fallbackLabel, confidence: 0, probabilities: {} };
}

/**
 * Create prediction result from scores
 */
function createPredictionFromScores(
    scores: Record<string, number>,
    confidenceOverride?: number,
): PredictionResult {
    const bestLabel = findBestLabel(scores);
    const probabilities = normalizeProbabilities(scores);
    const confidence = confidenceOverride ?? probabilities[bestLabel];

    return { label: bestLabel, confidence, probabilities };
}

export class NaiveBayesClassifier {
    private _classPriors: Record<string, number>;
    private _featureWeights: Record<string, number[]>;
    private _fitted: boolean;

    constructor() {
        this._classPriors = {};
        this._featureWeights = {};
        this._fitted = false;
    }

    get isFitted(): boolean {
        return this._fitted;
    }

    get classes(): string[] {
        return Object.keys(this._classPriors);
    }

    /**
     * Train the classifier using Multinomial Naive Bayes
     */
    fit(vectors: number[][], labels: string[]): this {
        const { labelCounts, featuresByLabel } = groupVectorsByLabel(vectors, labels);
        const totalSamples = labels.length;
        const nFeatures = vectors[0].length;

        // Compute feature sums per class and multinomial log-probabilities
        Object.entries(featuresByLabel).forEach(([label, labelVectors]) => {
            const classSums = sumFeatures(labelVectors);
            this._classPriors[label] = labelCounts[label] / totalSamples;
            this._featureWeights[label] = computeMultinomialLogProbs(classSums, nFeatures);
        });

        this._fitted = true;

        console.log(
            `Multinomial NB: Trained on ${totalSamples} samples, ${this.classes.length} classes`,
        );
        return this;
    }

    /**
     * Predict class for a single vector
     * @param vector - Feature vector to classify
     * @param allowedClasses - Optional list of classes to consider (filters output)
     * @param fastMode - When true, only computes scores for allowed classes (faster but no "neither" detection)
     */
    predict(vector: number[], allowedClasses?: string[], fastMode = false): PredictionResult {
        if (!this._fitted) {
            throw new Error('Classifier must be fitted before predict');
        }

        const hasFilter = allowedClasses && allowedClasses.length > 0;

        // Fast mode: only compute scores for allowed classes
        if (fastMode && hasFilter) {
            return this._predictFiltered(vector, allowedClasses);
        }

        // Compute all scores
        const allScores = this._computeAllScores(vector);

        // No filtering: return normal prediction
        if (!hasFilter) {
            return createPredictionFromScores(allScores);
        }

        // Filter and check for "neither" case
        return NaiveBayesClassifier._predictWithNeitherDetection(allScores, allowedClasses);
    }

    /**
     * Predict with only allowed classes (fast mode)
     */
    private _predictFiltered(vector: number[], allowedClasses: string[]): PredictionResult {
        const scores = this._computeScoresForClasses(vector, allowedClasses);

        if (Object.keys(scores).length === 0) {
            return createFallbackResult(allowedClasses[0]);
        }

        return createPredictionFromScores(scores);
    }

    /**
     * Predict with "neither" detection - uses all scores to detect non-matching text
     */
    private static _predictWithNeitherDetection(
        allScores: Record<string, number>,
        allowedClasses: string[],
    ): PredictionResult {
        const allProbabilities = normalizeProbabilities(allScores);
        const overallBestLabel = findBestLabel(allScores);
        const filteredScores = filterScores(allScores, allowedClasses);

        if (Object.keys(filteredScores).length === 0) {
            return createFallbackResult(allowedClasses[0]);
        }

        const bestLabel = findBestLabel(filteredScores);
        const filteredProbabilities = normalizeProbabilities(filteredScores);

        // Use original probability if best match is outside allowed (indicates "neither")
        const isOutsideAllowed = !allowedClasses.includes(overallBestLabel);
        const confidence = isOutsideAllowed
            ? allProbabilities[bestLabel]
            : filteredProbabilities[bestLabel];

        return { label: bestLabel, confidence, probabilities: filteredProbabilities };
    }

    /**
     * Compute scores for specific classes only
     */
    private _computeScoresForClasses(vector: number[], classes: string[]): Record<string, number> {
        const scores: Record<string, number> = {};
        classes.forEach((label) => {
            if (label in this._classPriors) {
                scores[label] = this._computeScore(vector, label);
            }
        });
        return scores;
    }

    /**
     * Predict classes for multiple vectors
     * @param vectors - Feature vectors to classify
     * @param allowedClasses - Optional list of classes to consider (filters output)
     * @param fastMode - When true, only computes scores for allowed classes
     */
    predictBatch(
        vectors: number[][],
        allowedClasses?: string[],
        fastMode = false,
    ): PredictionResult[] {
        return vectors.map((v) => this.predict(v, allowedClasses, fastMode));
    }

    /**
     * Export model for saving
     */
    toJSON(): ClassifierData {
        return {
            classPriors: this._classPriors,
            featureWeights: this._featureWeights,
        };
    }

    /**
     * Load model from saved data
     */
    static fromJSON(data: ClassifierData): NaiveBayesClassifier {
        const classifier = new NaiveBayesClassifier();
        classifier._classPriors = data.classPriors;
        classifier._featureWeights = data.featureWeights;
        classifier._fitted = true;
        return classifier;
    }

    /**
     * Compute scores for all classes
     */
    private _computeAllScores(vector: number[]): Record<string, number> {
        const scores: Record<string, number> = {};
        this.classes.forEach((label) => {
            scores[label] = this._computeScore(vector, label);
        });
        return scores;
    }

    /**
     * Compute Multinomial NB score for a class.
     * score = log P(class) + Σ x_i * logProb[class][i]
     */
    private _computeScore(vector: number[], label: string): number {
        const logProbs = this._featureWeights[label];
        let score = Math.log(this._classPriors[label]);

        vector.forEach((val, i) => {
            if (val > 0) {
                score += val * logProbs[i];
            }
        });

        return score;
    }
}

export default NaiveBayesClassifier;
