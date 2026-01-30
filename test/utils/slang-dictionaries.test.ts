import { expect } from 'chai';
import {
   SLANG_WORDS,
   SPANISH_SLANG,
   ENGLISH_SLANG,
   FRENCH_SLANG,
   ITALIAN_SLANG,
   PORTUGUESE_SLANG,
   GERMAN_SLANG,
} from '../../src/utils/slang-dictionaries';

describe('slang-dictionaries', () => {
   describe('SLANG_WORDS', () => {
      it('should have all supported languages', () => {
         expect(SLANG_WORDS).to.have.property('es');
         expect(SLANG_WORDS).to.have.property('en');
         expect(SLANG_WORDS).to.have.property('fr');
         expect(SLANG_WORDS).to.have.property('it');
         expect(SLANG_WORDS).to.have.property('pt');
         expect(SLANG_WORDS).to.have.property('de');
      });

      it('should have non-empty dictionaries for all languages', () => {
         expect(SLANG_WORDS.es.size).to.be.greaterThan(0);
         expect(SLANG_WORDS.en.size).to.be.greaterThan(0);
         expect(SLANG_WORDS.fr.size).to.be.greaterThan(0);
         expect(SLANG_WORDS.it.size).to.be.greaterThan(0);
         expect(SLANG_WORDS.pt.size).to.be.greaterThan(0);
         expect(SLANG_WORDS.de.size).to.be.greaterThan(0);
      });
   });

   describe('SPANISH_SLANG', () => {
      it('should be a Set', () => {
         expect(SPANISH_SLANG).to.be.instanceOf(Set);
      });

      it('should contain common Spanish slang', () => {
         expect(SPANISH_SLANG.has('hola')).to.be.true;
         expect(SPANISH_SLANG.has('wey')).to.be.true;
         expect(SPANISH_SLANG.has('chido')).to.be.true;
      });

      it('should contain Mexican slang', () => {
         expect(SPANISH_SLANG.has('orale')).to.be.true;
         expect(SPANISH_SLANG.has('neta')).to.be.true;
      });

      it('should contain Argentine slang', () => {
         expect(SPANISH_SLANG.has('boludo')).to.be.true;
         expect(SPANISH_SLANG.has('che')).to.be.true;
      });

      it('should have substantial coverage', () => {
         expect(SPANISH_SLANG.size).to.be.greaterThan(1000);
      });
   });

   describe('ENGLISH_SLANG', () => {
      it('should be a Set', () => {
         expect(ENGLISH_SLANG).to.be.instanceOf(Set);
      });

      it('should contain common English slang', () => {
         expect(ENGLISH_SLANG.has('hello')).to.be.true;
         expect(ENGLISH_SLANG.has('lol')).to.be.true;
         expect(ENGLISH_SLANG.has('bruh')).to.be.true;
      });

      it('should contain British slang', () => {
         expect(ENGLISH_SLANG.has('mate')).to.be.true;
         expect(ENGLISH_SLANG.has('innit')).to.be.true;
      });

      it('should contain gaming slang', () => {
         expect(ENGLISH_SLANG.has('gg')).to.be.true;
         expect(ENGLISH_SLANG.has('noob')).to.be.true;
      });

      it('should have substantial coverage', () => {
         expect(ENGLISH_SLANG.size).to.be.greaterThan(800);
      });
   });

   describe('FRENCH_SLANG', () => {
      it('should be a Set', () => {
         expect(FRENCH_SLANG).to.be.instanceOf(Set);
      });

      it('should contain common French slang', () => {
         expect(FRENCH_SLANG.has('salut')).to.be.true;
         expect(FRENCH_SLANG.has('mdr')).to.be.true;
         expect(FRENCH_SLANG.has('ptdr')).to.be.true;
      });

      it('should contain French abbreviations', () => {
         expect(FRENCH_SLANG.has('slt')).to.be.true;
         expect(FRENCH_SLANG.has('bjr')).to.be.true;
         expect(FRENCH_SLANG.has('tkt')).to.be.true;
      });

      it('should have reasonable coverage', () => {
         expect(FRENCH_SLANG.size).to.be.greaterThan(200);
      });
   });

   describe('ITALIAN_SLANG', () => {
      it('should be a Set', () => {
         expect(ITALIAN_SLANG).to.be.instanceOf(Set);
      });

      it('should contain common Italian slang', () => {
         expect(ITALIAN_SLANG.has('ciao')).to.be.true;
         expect(ITALIAN_SLANG.has('boh')).to.be.true;
      });

      it('should contain Italian abbreviations', () => {
         expect(ITALIAN_SLANG.has('cmq')).to.be.true;
         expect(ITALIAN_SLANG.has('tvb')).to.be.true;
         expect(ITALIAN_SLANG.has('grz')).to.be.true;
      });

      it('should have reasonable coverage', () => {
         expect(ITALIAN_SLANG.size).to.be.greaterThan(200);
      });
   });

   describe('PORTUGUESE_SLANG', () => {
      it('should be a Set', () => {
         expect(PORTUGUESE_SLANG).to.be.instanceOf(Set);
      });

      it('should contain Brazilian Portuguese slang', () => {
         expect(PORTUGUESE_SLANG.has('oi')).to.be.true;
         expect(PORTUGUESE_SLANG.has('mano')).to.be.true;
         expect(PORTUGUESE_SLANG.has('bora')).to.be.true;
      });

      it('should contain Portuguese abbreviations', () => {
         expect(PORTUGUESE_SLANG.has('vc')).to.be.true;
         expect(PORTUGUESE_SLANG.has('blz')).to.be.true;
         expect(PORTUGUESE_SLANG.has('vlw')).to.be.true;
      });

      it('should contain European Portuguese slang', () => {
         expect(PORTUGUESE_SLANG.has('fixe')).to.be.true;
         expect(PORTUGUESE_SLANG.has('porreiro')).to.be.true;
      });

      it('should have reasonable coverage', () => {
         expect(PORTUGUESE_SLANG.size).to.be.greaterThan(300);
      });
   });

   describe('GERMAN_SLANG', () => {
      it('should be a Set', () => {
         expect(GERMAN_SLANG).to.be.instanceOf(Set);
      });

      it('should contain common German slang', () => {
         expect(GERMAN_SLANG.has('hallo')).to.be.true;
         expect(GERMAN_SLANG.has('moin')).to.be.true;
         expect(GERMAN_SLANG.has('tschüss')).to.be.true;
      });

      it('should contain German youth slang', () => {
         expect(GERMAN_SLANG.has('digga')).to.be.true;
         expect(GERMAN_SLANG.has('krass')).to.be.true;
         expect(GERMAN_SLANG.has('geil')).to.be.true;
      });

      it('should contain German abbreviations', () => {
         expect(GERMAN_SLANG.has('lg')).to.be.true;
         expect(GERMAN_SLANG.has('hdl')).to.be.true;
         expect(GERMAN_SLANG.has('vllt')).to.be.true;
      });

      it('should contain Austrian German slang', () => {
         expect(GERMAN_SLANG.has('oida')).to.be.true;
         expect(GERMAN_SLANG.has('leiwand')).to.be.true;
         expect(GERMAN_SLANG.has('servus')).to.be.true;
      });

      it('should contain Swiss German slang', () => {
         expect(GERMAN_SLANG.has('grüezi')).to.be.true;
         expect(GERMAN_SLANG.has('merci vielmal')).to.be.true;
      });

      it('should have reasonable coverage', () => {
         expect(GERMAN_SLANG.size).to.be.greaterThan(300);
      });
   });

   describe('cross-language disambiguation', () => {
      it('should have unique identifiers for Spanish', () => {
         expect(SPANISH_SLANG.has('orale')).to.be.true;
         expect(ENGLISH_SLANG.has('orale')).to.be.false;
      });

      it('should have unique identifiers for French', () => {
         expect(FRENCH_SLANG.has('mdr')).to.be.true;
         expect(ENGLISH_SLANG.has('mdr')).to.be.false;
      });

      it('should have unique identifiers for German', () => {
         expect(GERMAN_SLANG.has('digga')).to.be.true;
         expect(ENGLISH_SLANG.has('digga')).to.be.false;
      });

      it('should have unique identifiers for Portuguese', () => {
         expect(PORTUGUESE_SLANG.has('kkk')).to.be.true;
         expect(SPANISH_SLANG.has('kkk')).to.be.false;
      });
   });
});
