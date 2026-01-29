import { expect } from 'chai';
import { extractNgrams, countNgrams, getTermFrequencies } from '../../src/utils/ngram-extractor';

describe('ngram-extractor', () => {
   describe('extractNgrams', () => {
      it('should extract bigrams by default', () => {
         const ngrams = extractNgrams('hello', 2, 2);
         expect(ngrams).to.deep.equal(['he', 'el', 'll', 'lo']);
      });

      it('should extract trigrams', () => {
         const ngrams = extractNgrams('hello', 3, 3);
         expect(ngrams).to.deep.equal(['hel', 'ell', 'llo']);
      });

      it('should extract multiple n-gram sizes', () => {
         const ngrams = extractNgrams('abc', 2, 3);
         expect(ngrams).to.include('ab');
         expect(ngrams).to.include('bc');
         expect(ngrams).to.include('abc');
      });

      it('should convert to lowercase', () => {
         const ngrams = extractNgrams('ABC', 2, 2);
         expect(ngrams).to.deep.equal(['ab', 'bc']);
      });

      it('should handle short text', () => {
         const ngrams = extractNgrams('a', 2, 2);
         expect(ngrams).to.deep.equal([]);
      });

      it('should handle empty text', () => {
         const ngrams = extractNgrams('', 2, 2);
         expect(ngrams).to.deep.equal([]);
      });
   });

   describe('countNgrams', () => {
      it('should count n-gram occurrences', () => {
         const ngrams = ['ab', 'ab', 'bc', 'ab'];
         const counts = countNgrams(ngrams);
         expect(counts).to.deep.equal({ ab: 3, bc: 1 });
      });

      it('should handle empty array', () => {
         const counts = countNgrams([]);
         expect(counts).to.deep.equal({});
      });
   });

   describe('getTermFrequencies', () => {
      it('should return normalized frequencies', () => {
         const tf = getTermFrequencies('aa', 2, 2);
         expect(tf.aa).to.equal(1);
      });

      it('should handle text with multiple n-grams', () => {
         const tf = getTermFrequencies('hello', 2, 2);
         expect(Object.keys(tf).length).to.equal(4);
         expect(tf.he).to.be.closeTo(0.25, 0.01);
      });
   });
});
