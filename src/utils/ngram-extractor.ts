/**
 * N-gram extraction utilities for language detection
 */

import type { NgramCounts, TermFrequencies } from '../types';

/**
 * Extract character n-grams from text
 * @param text - Input text
 * @param minN - Minimum n-gram size (default: 2)
 * @param maxN - Maximum n-gram size (default: 4)
 * @returns Array of n-grams
 */
export function extractNgrams(text: string, minN: number = 2, maxN: number = 4): string[] {
   const ngrams: string[] = [];
   const normalized = text.toLowerCase();

   for (let n = minN; n <= maxN; n += 1) {
      for (let i = 0; i <= normalized.length - n; i += 1) {
         ngrams.push(normalized.substring(i, i + n));
      }
   }

   return ngrams;
}

/**
 * Count n-gram frequencies
 * @param ngrams - Array of n-grams
 * @returns Frequency counts
 */
export function countNgrams(ngrams: string[]): NgramCounts {
   const counts: NgramCounts = {};

   ngrams.forEach((ng) => {
      counts[ng] = (counts[ng] || 0) + 1;
   });

   return counts;
}

/**
 * Get term frequency (TF) for n-grams
 * @param text - Input text
 * @param minN - Minimum n-gram size
 * @param maxN - Maximum n-gram size
 * @returns Term frequencies
 */
export function getTermFrequencies(
   text: string,
   minN: number = 2,
   maxN: number = 4,
): TermFrequencies {
   const ngrams = extractNgrams(text, minN, maxN);
   const counts = countNgrams(ngrams);
   const total = ngrams.length || 1;

   const tf: TermFrequencies = {};
   Object.entries(counts).forEach(([ng, count]) => {
      tf[ng] = count / total;
   });

   return tf;
}
