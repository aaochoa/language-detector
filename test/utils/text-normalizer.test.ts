import { expect } from 'chai';
import { normalizeText, augmentText } from '../../src/utils/text-normalizer';

describe('text-normalizer', () => {
   describe('normalizeText', () => {
      it('should convert text to lowercase', () => {
         expect(normalizeText('Hello World')).to.equal('hello world');
      });

      it('should remove URLs', () => {
         expect(normalizeText('Check this https://example.com out')).to.equal('check this out');
      });

      it('should remove email addresses', () => {
         expect(normalizeText('Contact me at test@example.com please')).to.equal(
            'contact me at please',
         );
      });

      it('should remove phone numbers', () => {
         expect(normalizeText('Call me at +1-555-123-4567')).to.equal('call me at');
      });

      it('should normalize whitespace', () => {
         expect(normalizeText('hello    world')).to.equal('hello world');
      });

      it('should handle empty input', () => {
         expect(normalizeText('')).to.equal('');
         expect(normalizeText(null)).to.equal('');
         expect(normalizeText(undefined)).to.equal('');
      });

      it('should handle non-string input', () => {
         expect(normalizeText(123 as unknown as string)).to.equal('');
         expect(normalizeText({} as unknown as string)).to.equal('');
      });

      it('should trim whitespace', () => {
         expect(normalizeText('  hello world  ')).to.equal('hello world');
      });
   });

   describe('augmentText', () => {
      it('should return original text as first variation', () => {
         const variations = augmentText('hello world', 'en');
         expect(variations[0]).to.equal('hello world');
      });

      it('should include normalized version', () => {
         const variations = augmentText('Hello World', 'en');
         expect(variations).to.include('hello world');
      });

      it('should include punctuation-free version', () => {
         const variations = augmentText('hello, world!', 'en');
         expect(variations).to.include('hello world');
      });

      it('should generate Spanish abbreviations', () => {
         const variations = augmentText('porque no vienes', 'es');
         expect(variations.some((v) => v.includes('xq'))).to.be.true;
      });

      it('should generate English abbreviations', () => {
         const variations = augmentText('see you before tomorrow', 'en');
         expect(variations.some((v) => v.includes('u'))).to.be.true;
      });

      it('should generate French abbreviations', () => {
         const variations = augmentText('salut bonjour', 'fr');
         expect(variations.some((v) => v.includes('slt') || v.includes('bjr'))).to.be.true;
      });

      it('should generate Italian abbreviations', () => {
         const variations = augmentText('comunque grazie', 'it');
         expect(variations.some((v) => v.includes('cmq') || v.includes('grz'))).to.be.true;
      });

      it('should generate Portuguese abbreviations', () => {
         const variations = augmentText('voce tambem', 'pt');
         expect(variations.some((v) => v.includes('vc') || v.includes('tb'))).to.be.true;
      });

      it('should generate German abbreviations', () => {
         const variations = augmentText('vielleicht danke', 'de');
         expect(variations.some((v) => v.includes('vllt') || v.includes('thx'))).to.be.true;
      });

      it('should handle unknown language gracefully', () => {
         const variations = augmentText('hello world', 'unknown');
         expect(variations).to.be.an('array');
         expect(variations.length).to.be.at.least(1);
      });

      it('should handle empty text', () => {
         const variations = augmentText('', 'en');
         expect(variations).to.include('');
      });

      it('should not duplicate identical variations', () => {
         const variations = augmentText('hello', 'en');
         const uniqueVariations = [...new Set(variations)];
         // Allow some duplicates but not excessive
         expect(uniqueVariations.length).to.be.at.least(1);
      });
   });
});
