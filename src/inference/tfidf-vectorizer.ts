/* eslint-disable no-console */
/**
 * TF-IDF Vectorizer for character n-grams
 */

import { extractNgrams, countNgrams } from '../utils/ngram-extractor';
import type { VectorizerOptions, VectorizerData } from '../types';

export class TfidfVectorizer {
   private _minN: number;
   private _maxN: number;
   private _maxFeatures: number;
   private _vocabulary: Record<string, number>;
   private _idf: Record<string, number>;
   private _fitted: boolean;

   constructor(options: VectorizerOptions = {}) {
      this._minN = options.minN ?? 2;
      this._maxN = options.maxN ?? 4;
      this._maxFeatures = options.maxFeatures ?? 5000;
      this._vocabulary = {};
      this._idf = {};
      this._fitted = false;
   }

   /**
    * Get configuration
    */
   get minN(): number {
      return this._minN;
   }

   get maxN(): number {
      return this._maxN;
   }

   get maxFeatures(): number {
      return this._maxFeatures;
   }

   get vocabularySize(): number {
      return Object.keys(this._vocabulary).length;
   }

   get isFitted(): boolean {
      return this._fitted;
   }

   /**
    * Fit the vectorizer on training texts
    * @param texts - Array of training texts
    * @returns this
    */
   fit(texts: string[]): this {
      const documentFrequency: Record<string, number> = {};
      const totalDocs = texts.length;

      // Count document frequency for each n-gram
      texts.forEach((text) => {
         const ngrams = extractNgrams(text, this._minN, this._maxN);
         const uniqueNgrams = new Set(ngrams);

         uniqueNgrams.forEach((ng) => {
            documentFrequency[ng] = (documentFrequency[ng] || 0) + 1;
         });
      });

      // Select top features by document frequency
      const sortedFeatures = Object.entries(documentFrequency)
         .sort((a, b) => b[1] - a[1])
         .slice(0, this._maxFeatures);

      // Build vocabulary and compute IDF
      sortedFeatures.forEach(([ng, df], idx) => {
         this._vocabulary[ng] = idx;
         // IDF with smoothing: log((N + 1) / (df + 1)) + 1
         this._idf[ng] = Math.log((totalDocs + 1) / (df + 1)) + 1;
      });

      this._fitted = true;
      console.log(`TF-IDF Vectorizer: Vocabulary size = ${this.vocabularySize}`);

      return this;
   }

   /**
    * Transform text to TF-IDF vector
    * @param text - Input text
    * @returns TF-IDF vector
    */
   transform(text: string): number[] {
      if (!this._fitted) {
         throw new Error('Vectorizer must be fitted before transform');
      }

      const ngrams = extractNgrams(text, this._minN, this._maxN);
      const counts = countNgrams(ngrams);
      const totalNgrams = ngrams.length || 1;

      const vector = new Array<number>(this.vocabularySize).fill(0);

      Object.entries(counts).forEach(([ng, count]) => {
         if (this._vocabulary[ng] !== undefined) {
            const idx = this._vocabulary[ng];
            const tf = count / totalNgrams;
            vector[idx] = tf * this._idf[ng];
         }
      });

      return vector;
   }

   /**
    * Fit and transform in one step
    * @param texts - Training texts
    * @returns Array of TF-IDF vectors
    */
   fitTransform(texts: string[]): number[][] {
      this.fit(texts);
      return texts.map((text) => this.transform(text));
   }

   /**
    * Export model for saving
    * @returns Serializable model data
    */
   toJSON(): VectorizerData {
      return {
         minN: this._minN,
         maxN: this._maxN,
         maxFeatures: this._maxFeatures,
         vocabulary: this._vocabulary,
         idf: this._idf,
      };
   }

   /**
    * Load model from saved data
    * @param data - Saved model data
    * @returns Loaded vectorizer
    */
   static fromJSON(data: VectorizerData): TfidfVectorizer {
      const vectorizer = new TfidfVectorizer({
         minN: data.minN,
         maxN: data.maxN,
         maxFeatures: data.maxFeatures,
      });
      vectorizer._vocabulary = data.vocabulary;
      vectorizer._idf = data.idf;
      vectorizer._fitted = true;
      return vectorizer;
   }
}

export default TfidfVectorizer;
