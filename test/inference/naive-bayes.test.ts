import { expect } from 'chai';
import { NaiveBayesClassifier } from '../../src/inference/naive-bayes';

describe('NaiveBayesClassifier', () => {
   describe('fit', () => {
      it('should train on vectors and labels', () => {
         const classifier = new NaiveBayesClassifier();
         const vectors = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
         ];
         const labels = ['a', 'b', 'c'];

         classifier.fit(vectors, labels);

         expect(classifier.isFitted).to.be.true;
         expect(classifier.classes).to.deep.equal(['a', 'b', 'c']);
      });

      it('should compute class priors', () => {
         const classifier = new NaiveBayesClassifier();
         const vectors = [
            [1, 0],
            [1, 0],
            [0, 1],
         ];
         const labels = ['a', 'a', 'b'];

         classifier.fit(vectors, labels);

         // Class 'a' appears 2/3 times, class 'b' appears 1/3 times
         const json = classifier.toJSON();
         expect(json.classPriors.a).to.be.closeTo(2 / 3, 0.01);
         expect(json.classPriors.b).to.be.closeTo(1 / 3, 0.01);
      });
   });

   describe('predict', () => {
      it('should throw error if not fitted', () => {
         const classifier = new NaiveBayesClassifier();
         expect(() => classifier.predict([1, 0])).to.throw('must be fitted');
      });

      it('should return prediction with label and confidence', () => {
         const classifier = new NaiveBayesClassifier();
         classifier.fit(
            [
               [1, 0],
               [0, 1],
            ],
            ['a', 'b'],
         );

         const result = classifier.predict([1, 0]);

         expect(result).to.have.property('label');
         expect(result).to.have.property('confidence');
         expect(result).to.have.property('probabilities');
      });

      it('should classify similar vectors correctly', () => {
         const classifier = new NaiveBayesClassifier();

         // Create clear separation between classes
         const vectors = [
            [1, 1, 0, 0],
            [1, 0.9, 0, 0],
            [0.9, 1, 0, 0],
            [0, 0, 1, 1],
            [0, 0, 1, 0.9],
            [0, 0, 0.9, 1],
         ];
         const labels = ['a', 'a', 'a', 'b', 'b', 'b'];

         classifier.fit(vectors, labels);

         // Test prediction
         const result = classifier.predict([0.8, 0.8, 0, 0]);
         expect(result.label).to.equal('a');

         const result2 = classifier.predict([0, 0, 0.8, 0.8]);
         expect(result2.label).to.equal('b');
      });
   });

   describe('predictBatch', () => {
      it('should predict multiple vectors', () => {
         const classifier = new NaiveBayesClassifier();
         classifier.fit(
            [
               [1, 0],
               [0, 1],
            ],
            ['a', 'b'],
         );

         const results = classifier.predictBatch([
            [1, 0],
            [0, 1],
         ]);

         expect(results).to.have.lengthOf(2);
         expect(results[0]).to.have.property('label');
         expect(results[1]).to.have.property('label');
      });
   });

   describe('serialization', () => {
      it('should serialize to JSON', () => {
         const classifier = new NaiveBayesClassifier();
         classifier.fit(
            [
               [1, 0],
               [0, 1],
            ],
            ['a', 'b'],
         );

         const json = classifier.toJSON();
         expect(json).to.have.property('classPriors');
         expect(json).to.have.property('featureMeans');
         expect(json).to.have.property('featureVariances');
      });

      it('should deserialize from JSON', () => {
         const original = new NaiveBayesClassifier();
         original.fit(
            [
               [1, 0],
               [0, 1],
            ],
            ['a', 'b'],
         );

         const json = original.toJSON();
         const restored = NaiveBayesClassifier.fromJSON(json);

         expect(restored.isFitted).to.be.true;
         expect(restored.classes).to.deep.equal(original.classes);
      });

      it('should produce same predictions after deserialization', () => {
         const original = new NaiveBayesClassifier();
         original.fit(
            [
               [1, 0],
               [0, 1],
            ],
            ['a', 'b'],
         );

         const json = original.toJSON();
         const restored = NaiveBayesClassifier.fromJSON(json);

         const originalPred = original.predict([1, 0]);
         const restoredPred = restored.predict([1, 0]);

         expect(restoredPred.label).to.equal(originalPred.label);
      });
   });
});
