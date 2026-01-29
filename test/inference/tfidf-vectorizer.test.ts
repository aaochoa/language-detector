import { expect } from 'chai';
import { TfidfVectorizer } from '../../src/inference/tfidf-vectorizer';

describe('TfidfVectorizer', () => {
   describe('constructor', () => {
      it('should use default options', () => {
         const vectorizer = new TfidfVectorizer();
         expect(vectorizer.minN).to.equal(2);
         expect(vectorizer.maxN).to.equal(4);
         expect(vectorizer.maxFeatures).to.equal(5000);
      });

      it('should accept custom options', () => {
         const vectorizer = new TfidfVectorizer({ minN: 3, maxN: 5, maxFeatures: 1000 });
         expect(vectorizer.minN).to.equal(3);
         expect(vectorizer.maxN).to.equal(5);
         expect(vectorizer.maxFeatures).to.equal(1000);
      });
   });

   describe('fit', () => {
      it('should build vocabulary from texts', () => {
         const vectorizer = new TfidfVectorizer({ maxFeatures: 100 });
         vectorizer.fit(['hello', 'world', 'hello world']);

         expect(vectorizer.isFitted).to.be.true;
         expect(vectorizer.vocabularySize).to.be.greaterThan(0);
      });

      it('should limit vocabulary size', () => {
         const vectorizer = new TfidfVectorizer({ maxFeatures: 5 });
         vectorizer.fit(['hello world', 'hello there', 'world peace']);

         expect(vectorizer.vocabularySize).to.be.at.most(5);
      });
   });

   describe('transform', () => {
      it('should throw error if not fitted', () => {
         const vectorizer = new TfidfVectorizer();
         expect(() => vectorizer.transform('hello')).to.throw('must be fitted');
      });

      it('should return vector of correct size', () => {
         const vectorizer = new TfidfVectorizer({ maxFeatures: 50 });
         vectorizer.fit(['hello', 'world']);
         const vector = vectorizer.transform('hello');

         expect(vector).to.be.an('array');
         expect(vector.length).to.equal(vectorizer.vocabularySize);
      });

      it('should return non-zero values for known n-grams', () => {
         const vectorizer = new TfidfVectorizer({ maxFeatures: 50 });
         vectorizer.fit(['hello', 'hello', 'hello']);
         const vector = vectorizer.transform('hello');

         expect(vector.some((v) => v > 0)).to.be.true;
      });
   });

   describe('serialization', () => {
      it('should serialize to JSON', () => {
         const vectorizer = new TfidfVectorizer({ maxFeatures: 50 });
         vectorizer.fit(['hello', 'world']);

         const json = vectorizer.toJSON();
         expect(json).to.have.property('vocabulary');
         expect(json).to.have.property('idf');
         expect(json).to.have.property('minN');
         expect(json).to.have.property('maxN');
      });

      it('should deserialize from JSON', () => {
         const original = new TfidfVectorizer({ maxFeatures: 50 });
         original.fit(['hello', 'world']);

         const json = original.toJSON();
         const restored = TfidfVectorizer.fromJSON(json);

         expect(restored.isFitted).to.be.true;
         expect(restored.vocabularySize).to.equal(original.vocabularySize);
      });

      it('should produce same vectors after deserialization', () => {
         const original = new TfidfVectorizer({ maxFeatures: 50 });
         original.fit(['hello', 'world']);

         const json = original.toJSON();
         const restored = TfidfVectorizer.fromJSON(json);

         const originalVector = original.transform('hello');
         const restoredVector = restored.transform('hello');

         expect(restoredVector).to.deep.equal(originalVector);
      });
   });
});
