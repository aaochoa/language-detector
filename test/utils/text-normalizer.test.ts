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
   });
});
