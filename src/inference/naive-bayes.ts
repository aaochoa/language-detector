/* eslint-disable no-console */
/**
 * Naive Bayes Classifier for language detection
 */

import type { ClassifierData, PredictionResult } from '../types';

// Laplace smoothing constant to avoid zero variance
const VARIANCE_SMOOTHING = 1e-9;

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
 * Compute mean values for each feature
 */
function computeMeans(labelVectors: number[][]): number[] {
   const numFeatures = labelVectors[0].length;
   const means = new Array<number>(numFeatures).fill(0);

   labelVectors.forEach((vector) => {
      vector.forEach((val, i) => {
         means[i] += val;
      });
   });

   means.forEach((sum, i) => {
      means[i] = sum / labelVectors.length;
   });

   return means;
}

/**
 * Compute variance values for each feature with Laplace smoothing
 */
function computeVariances(labelVectors: number[][], means: number[]): number[] {
   const numFeatures = labelVectors[0].length;
   const variances = new Array<number>(numFeatures).fill(0);

   labelVectors.forEach((vector) => {
      vector.forEach((val, i) => {
         variances[i] += (val - means[i]) ** 2;
      });
   });

   variances.forEach((sumSq, i) => {
      variances[i] = sumSq / labelVectors.length + VARIANCE_SMOOTHING;
   });

   return variances;
}

/**
 * Find the best label from log probabilities
 */
function findBestLabel(logProbs: Record<string, number>): string {
   let bestLabel: string | null = null;
   let bestLogProb = -Infinity;

   Object.entries(logProbs).forEach(([label, logProb]) => {
      if (logProb > bestLogProb) {
         bestLogProb = logProb;
         bestLabel = label;
      }
   });

   return bestLabel!;
}

/**
 * Convert log probabilities to normalized probabilities
 */
function normalizeProbabilities(logProbs: Record<string, number>): Record<string, number> {
   const maxLogProb = Math.max(...Object.values(logProbs));
   const expProbs: Record<string, number> = {};
   let sumExpProbs = 0;

   Object.entries(logProbs).forEach(([label, logProb]) => {
      expProbs[label] = Math.exp(logProb - maxLogProb);
      sumExpProbs += expProbs[label];
   });

   return Object.fromEntries(
      Object.entries(expProbs).map(([label, prob]) => [label, prob / sumExpProbs]),
   );
}

export class NaiveBayesClassifier {
   private _classPriors: Record<string, number>;
   private _featureMeans: Record<string, number[]>;
   private _featureVariances: Record<string, number[]>;
   private _fitted: boolean;

   constructor() {
      this._classPriors = {};
      this._featureMeans = {};
      this._featureVariances = {};
      this._fitted = false;
   }

   get isFitted(): boolean {
      return this._fitted;
   }

   get classes(): string[] {
      return Object.keys(this._classPriors);
   }

   /**
    * Train the classifier
    */
   fit(vectors: number[][], labels: string[]): this {
      const { labelCounts, featuresByLabel } = groupVectorsByLabel(vectors, labels);
      const totalSamples = labels.length;

      this._computeStatistics(featuresByLabel, labelCounts, totalSamples);
      this._fitted = true;

      console.log(
         `Naive Bayes: Trained on ${totalSamples} samples, ${this.classes.length} classes`,
      );
      return this;
   }

   /**
    * Predict class for a single vector
    */
   predict(vector: number[]): PredictionResult {
      if (!this._fitted) {
         throw new Error('Classifier must be fitted before predict');
      }

      const logProbs = this._computeAllLogProbs(vector);
      const bestLabel = findBestLabel(logProbs);
      const probabilities = normalizeProbabilities(logProbs);

      return {
         label: bestLabel,
         confidence: probabilities[bestLabel],
         probabilities,
      };
   }

   /**
    * Predict classes for multiple vectors
    */
   predictBatch(vectors: number[][]): PredictionResult[] {
      return vectors.map((v) => this.predict(v));
   }

   /**
    * Export model for saving
    */
   toJSON(): ClassifierData {
      return {
         classPriors: this._classPriors,
         featureMeans: this._featureMeans,
         featureVariances: this._featureVariances,
      };
   }

   /**
    * Load model from saved data
    */
   static fromJSON(data: ClassifierData): NaiveBayesClassifier {
      const classifier = new NaiveBayesClassifier();
      classifier._classPriors = data.classPriors;
      classifier._featureMeans = data.featureMeans;
      classifier._featureVariances = data.featureVariances;
      classifier._fitted = true;
      return classifier;
   }

   /**
    * Compute statistics for all labels
    */
   private _computeStatistics(
      featuresByLabel: Record<string, number[][]>,
      labelCounts: Record<string, number>,
      totalSamples: number,
   ): void {
      Object.entries(featuresByLabel).forEach(([label, labelVectors]) => {
         this._classPriors[label] = labelCounts[label] / totalSamples;
         this._featureMeans[label] = computeMeans(labelVectors);
         this._featureVariances[label] = computeVariances(labelVectors, this._featureMeans[label]);
      });
   }

   /**
    * Compute log probabilities for all classes
    */
   private _computeAllLogProbs(vector: number[]): Record<string, number> {
      const logProbs: Record<string, number> = {};
      this.classes.forEach((label) => {
         logProbs[label] = this._computeLogProb(vector, label);
      });
      return logProbs;
   }

   /**
    * Compute log probability using Gaussian Naive Bayes
    */
   private _computeLogProb(vector: number[], label: string): number {
      const means = this._featureMeans[label];
      const variances = this._featureVariances[label];

      let logProb = Math.log(this._classPriors[label]);

      vector.forEach((val, i) => {
         if (val > 0) {
            const mean = means[i];
            const variance = variances[i];
            const diff = val - mean;
            logProb -= 0.5 * Math.log(2 * Math.PI * variance);
            logProb -= (diff * diff) / (2 * variance);
         }
      });

      return logProb;
   }
}

export default NaiveBayesClassifier;
