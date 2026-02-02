import { expect } from 'chai';
import { LanguageDetector, resetDetector } from '../../src/inference/detector';
import { TfidfVectorizer } from '../../src/inference/tfidf-vectorizer';
import { NaiveBayesClassifier } from '../../src/inference/naive-bayes';
import type { ModelData } from '../../src/types';

describe('LanguageDetector', () => {
   // Create a minimal model for testing (en/es only)
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

   // Create a multi-language model for testing language filtering
   function createMultiLanguageModel(): ModelData {
      const vectorizer = new TfidfVectorizer({ maxFeatures: 200 });
      const classifier = new NaiveBayesClassifier();

      // Train on data from multiple languages
      const texts = [
         'hola como estas',
         'buenos dias amigo',
         'hello how are you',
         'good morning friend',
         'bonjour comment allez vous',
         'bonsoir mon ami',
         'guten tag wie geht es',
         'guten morgen freund',
      ];
      const labels = ['es', 'es', 'en', 'en', 'fr', 'fr', 'de', 'de'];

      const vectors = vectorizer.fitTransform(texts);
      classifier.fit(vectors, labels);

      return {
         vectorizer: vectorizer.toJSON(),
         classifier: classifier.toJSON(),
         config: { languages: ['es', 'en', 'fr', 'de'] },
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

      it('should detect French slang', () => {
         const result = detector.detect('mdr ptdr');
         expect(result.language).to.equal('fr');
      });

      it('should detect Italian slang', () => {
         const result = detector.detect('cmq tvb');
         expect(result.language).to.equal('it');
      });

      it('should detect Portuguese slang', () => {
         const result = detector.detect('blz vlw tmj');
         expect(result.language).to.equal('pt');
      });

      it('should detect German slang', () => {
         const result = detector.detect('digga krass');
         expect(result.language).to.equal('de');
      });

      it('should handle whitespace-only text', () => {
         const result = detector.detect('   \t\n  ');
         expect(result.confidence).to.equal(0);
         expect(result.isReliable).to.be.false;
      });

      it('should include source in result', () => {
         const result = detector.detect('hola como estas amigo');
         expect(result).to.have.property('source');
      });

      it('should detect Mexican Spanish slang', () => {
         const result = detector.detect('que onda wey');
         expect(result.language).to.equal('es');
      });

      it('should detect Argentine Spanish slang', () => {
         const result = detector.detect('che boludo');
         expect(result.language).to.equal('es');
      });

      it('should detect Austrian German slang', () => {
         const result = detector.detect('oida leiwand');
         expect(result.language).to.equal('de');
      });

      it('should detect Swiss German slang', () => {
         const result = detector.detect('grüezi merci vielmal');
         expect(result.language).to.equal('de');
      });

      it('should detect Brazilian Portuguese slang', () => {
         const result = detector.detect('kkk mano bora');
         expect(result.language).to.equal('pt');
      });

      it('should handle text with emojis', () => {
         const result = detector.detect('hola amigo 😀👍');
         expect(result.language).to.equal('es');
      });

      it('should handle text with URLs', () => {
         const result = detector.detect('check this out https://example.com please');
         expect(result).to.have.property('language');
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

   describe('setAllowedLanguages', () => {
      let detector: LanguageDetector;

      beforeEach(() => {
         detector = new LanguageDetector();
         detector.loadModel(createTestModel());
      });

      it('should set allowed languages', () => {
         detector.setAllowedLanguages(['en', 'es']);

         expect(detector.allowedLanguages).to.deep.equal(['en', 'es']);
      });

      it('should return this for chaining', () => {
         const result = detector.setAllowedLanguages(['en']);

         expect(result).to.equal(detector);
      });

      it('should throw error for empty array', () => {
         expect(() => detector.setAllowedLanguages([])).to.throw('non-empty array');
      });

      it('should throw error for non-array', () => {
         expect(() => detector.setAllowedLanguages(null as unknown as string[])).to.throw(
            'non-empty array',
         );
      });

      it('should limit detection to allowed languages only', () => {
         detector.setAllowedLanguages(['en', 'es']);

         // French slang should not be detected as French
         const result = detector.detect('mdr ptdr');

         expect(result.language).to.be.oneOf(['en', 'es']);
      });

      it('should return best guess with low confidence for non-matching text', () => {
         // Use multi-language model so it can detect French as "not en/es"
         const multiLangDetector = new LanguageDetector();
         multiLangDetector.loadModel(createMultiLanguageModel());
         multiLangDetector.setAllowedLanguages(['en', 'es']);

         // French text when only en/es allowed - model knows French but we exclude it
         const result = multiLangDetector.detect('bonjour comment allez vous');

         expect(result.language).to.be.oneOf(['en', 'es']);
         // Confidence should be low since text is actually French
         expect(result.isReliable).to.be.false;
      });

      it('should still detect Spanish correctly when in allowed list', () => {
         detector.setAllowedLanguages(['en', 'es']);

         const result = detector.detect('hola como estas amigo');

         expect(result.language).to.equal('es');
      });

      it('should still detect English correctly when in allowed list', () => {
         detector.setAllowedLanguages(['en', 'es']);

         const result = detector.detect('hello how are you friend');

         expect(result.language).to.equal('en');
      });

      it('should filter slang detection to allowed languages', () => {
         detector.setAllowedLanguages(['en']);

         // Spanish slang should not be detected
         const result = detector.detect('que onda wey');

         expect(result.language).to.equal('en');
      });

      it('should handle single language restriction', () => {
         // Use multi-language model to properly detect "not Spanish"
         const multiLangDetector = new LanguageDetector();
         multiLangDetector.loadModel(createMultiLanguageModel());
         multiLangDetector.setAllowedLanguages(['es']);

         // English text but only Spanish allowed
         const result = multiLangDetector.detect('hello how are you friend');

         expect(result.language).to.equal('es');
         // Should be unreliable since text is actually English
         expect(result.isReliable).to.be.false;
      });
   });

   describe('clearAllowedLanguages', () => {
      let detector: LanguageDetector;

      beforeEach(() => {
         detector = new LanguageDetector();
         detector.loadModel(createTestModel());
      });

      it('should clear language restrictions', () => {
         detector.setAllowedLanguages(['en', 'es']);
         detector.clearAllowedLanguages();

         expect(detector.allowedLanguages).to.be.null;
      });

      it('should return this for chaining', () => {
         const result = detector.clearAllowedLanguages();

         expect(result).to.equal(detector);
      });

      it('should restore full language detection after clearing', () => {
         detector.setAllowedLanguages(['en']);
         detector.clearAllowedLanguages();

         // French slang should be detected as French again
         const result = detector.detect('mdr ptdr');

         expect(result.language).to.equal('fr');
      });
   });

   describe('allowedLanguages getter', () => {
      it('should return null by default', () => {
         const detector = new LanguageDetector();
         expect(detector.allowedLanguages).to.be.null;
      });

      it('should return set languages', () => {
         const detector = new LanguageDetector();
         detector.loadModel(createTestModel());
         detector.setAllowedLanguages(['de', 'it']);

         expect(detector.allowedLanguages).to.deep.equal(['de', 'it']);
      });
   });

   describe('fastMode option', () => {
      it('should default to false', () => {
         const detector = new LanguageDetector();
         detector.loadModel(createTestModel());

         expect(detector.fastMode).to.be.false;
      });

      it('should be false when not specified in options', () => {
         const detector = new LanguageDetector();
         detector.loadModel(createTestModel());
         detector.setAllowedLanguages(['en', 'es']);

         expect(detector.fastMode).to.be.false;
      });

      it('should be true when explicitly set', () => {
         const detector = new LanguageDetector();
         detector.loadModel(createTestModel());
         detector.setAllowedLanguages(['en', 'es'], { fastMode: true });

         expect(detector.fastMode).to.be.true;
      });

      it('should be reset to false when clearAllowedLanguages is called', () => {
         const detector = new LanguageDetector();
         detector.loadModel(createTestModel());
         detector.setAllowedLanguages(['en', 'es'], { fastMode: true });
         detector.clearAllowedLanguages();

         expect(detector.fastMode).to.be.false;
      });

      it('should still detect correctly with fastMode enabled', () => {
         const detector = new LanguageDetector();
         detector.loadModel(createTestModel());
         detector.setAllowedLanguages(['en', 'es'], { fastMode: true });

         const spanishResult = detector.detect('hola como estas amigo');
         expect(spanishResult.language).to.equal('es');

         const englishResult = detector.detect('hello how are you friend');
         expect(englishResult.language).to.equal('en');
      });

      it('should have high confidence in fastMode for non-matching text', () => {
         // In fastMode, we skip "neither" detection so confidence is high
         const detector = new LanguageDetector();
         detector.loadModel(createMultiLanguageModel());
         detector.setAllowedLanguages(['en', 'es'], { fastMode: true });

         // French text with fastMode - should have higher confidence than without
         const result = detector.detect('bonjour comment allez vous');

         expect(result.language).to.be.oneOf(['en', 'es']);
         // In fast mode, confidence is re-normalized so it will be higher
         expect(result.confidence).to.be.greaterThan(0.3);
      });

      it('should have low confidence without fastMode for non-matching text', () => {
         // Without fastMode, we detect "neither" via low confidence
         const detector = new LanguageDetector();
         detector.loadModel(createMultiLanguageModel());
         detector.setAllowedLanguages(['en', 'es'], { fastMode: false });

         // French text without fastMode - should have lower confidence
         const result = detector.detect('bonjour comment allez vous');

         expect(result.language).to.be.oneOf(['en', 'es']);
         expect(result.isReliable).to.be.false;
      });

      it('should update fastMode when setAllowedLanguages is called again', () => {
         const detector = new LanguageDetector();
         detector.loadModel(createTestModel());

         detector.setAllowedLanguages(['en', 'es'], { fastMode: true });
         expect(detector.fastMode).to.be.true;

         detector.setAllowedLanguages(['en', 'es'], { fastMode: false });
         expect(detector.fastMode).to.be.false;

         detector.setAllowedLanguages(['en', 'es']);
         expect(detector.fastMode).to.be.false;
      });
   });
});
