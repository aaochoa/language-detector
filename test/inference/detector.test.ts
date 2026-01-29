import { expect } from 'chai';
import { LanguageDetector, resetDetector } from '../../src/inference/detector';
import { TfidfVectorizer } from '../../src/inference/tfidf-vectorizer';
import { NaiveBayesClassifier } from '../../src/inference/naive-bayes';
import type { ModelData } from '../../src/types';

describe('LanguageDetector', () => {
   // Create a minimal model for testing
   function createTestModel(): ModelData {
      const vectorizer = new TfidfVectorizer({ maxFeatures: 100 });
      const classifier = new NaiveBayesClassifier();

      // Train on minimal data
      const texts = ['hola como estas', 'buenos dias', 'hello how are you', 'good morning'];
      const labels = ['es', 'es', 'en', 'en'];

      const vectors = vectorizer.fitTransform(texts);
      classifier.fit(vectors, labels);

      return {
         vectorizer: vectorizer.toJSON(),
         classifier: classifier.toJSON(),
         config: { languages: ['es', 'en'] },
      };
   }

   beforeEach(() => {
      resetDetector();
   });

   describe('loadModel', () => {
      it('should load model from JSON data', () => {
         const detector = new LanguageDetector();
         const modelData = createTestModel();

         detector.loadModel(modelData);

         expect(detector.isLoaded).to.be.true;
         expect(detector.supportedLanguages).to.include('es');
         expect(detector.supportedLanguages).to.include('en');
      });

      it('should throw error for invalid model data', () => {
         const detector = new LanguageDetector();

         expect(() => detector.loadModel({} as ModelData)).to.throw('Invalid model data');
         expect(() => detector.loadModel(null as unknown as ModelData)).to.throw(
            'Invalid model data',
         );
      });
   });

   describe('detect', () => {
      let detector: LanguageDetector;

      beforeEach(() => {
         detector = new LanguageDetector();
         detector.loadModel(createTestModel());
      });

      it('should throw error if model not loaded', () => {
         const unloadedDetector = new LanguageDetector();
         expect(() => unloadedDetector.detect('hello')).to.throw('must be loaded');
      });

      it('should return detection result', () => {
         const result = detector.detect('hello how are you');

         expect(result).to.have.property('language');
         expect(result).to.have.property('confidence');
         expect(result).to.have.property('isReliable');
         expect(result).to.have.property('probabilities');
      });

      it('should handle empty text', () => {
         const result = detector.detect('');

         expect(result.language).to.equal('en');
         expect(result.confidence).to.equal(0);
         expect(result.isReliable).to.be.false;
      });

      it('should handle very short text', () => {
         // "hi" is in English slang dictionary, so it gets detected
         const result = detector.detect('hi');

         expect(result.language).to.equal('en');
         // Slang detection provides confidence for known words
         expect(result.confidence).to.be.at.least(0);
      });

      it('should return low confidence for unknown short text', () => {
         // "xy" is not in any slang dictionary
         const result = detector.detect('xy');

         expect(result.confidence).to.equal(0);
         expect(result.isReliable).to.be.false;
      });

      it('should handle null/undefined input', () => {
         expect(detector.detect(null).confidence).to.equal(0);
         expect(detector.detect(undefined).confidence).to.equal(0);
      });

      it('should detect Spanish text', () => {
         const result = detector.detect('hola como estas amigo');
         expect(result.language).to.equal('es');
      });

      it('should detect English text', () => {
         const result = detector.detect('hello how are you friend');
         expect(result.language).to.equal('en');
      });
   });

   describe('detectBatch', () => {
      it('should detect multiple texts', () => {
         const detector = new LanguageDetector();
         detector.loadModel(createTestModel());

         const results = detector.detectBatch(['hola', 'hello', 'buenos dias']);

         expect(results).to.have.lengthOf(3);
         results.forEach((result) => {
            expect(result).to.have.property('language');
         });
      });
   });

   describe('supportedLanguages', () => {
      it('should return empty array if not loaded', () => {
         const detector = new LanguageDetector();
         expect(detector.supportedLanguages).to.deep.equal([]);
      });

      it('should return languages after loading', () => {
         const detector = new LanguageDetector();
         detector.loadModel(createTestModel());

         expect(detector.supportedLanguages).to.be.an('array');
         expect(detector.supportedLanguages.length).to.be.greaterThan(0);
      });
   });
});
