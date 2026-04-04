/**
 * Slang Dictionaries for Language Detection
 *
 * Contains texting slang, abbreviations, and informal language patterns
 * for multiple languages. Used to improve language detection accuracy
 * for informal/casual text messages.
 *
 * This file imports language-specific slang dictionaries from separate files
 * for better maintainability and organization.
 *
 * Supported Languages:
 * - Spanish (es): ~1800+ terms - Regional variations from Mexico, Spain, Argentina,
 *   Colombia, Chile, Venezuela, Caribbean, Central America, Peru, Ecuador, Bolivia
 * - English (en): ~1300+ terms - Including British slang, AAVE, gaming slang
 * - French (fr): ~300+ terms - Common abbreviations, informal expressions
 * - Italian (it): ~350+ terms - Regional expressions, youth slang
 * - Portuguese (pt): ~500+ terms - Both Brazilian (pt-BR) and European (pt-PT)
 * - German (de): ~400+ terms - Standard German, Austrian, Swiss, youth slang
 * - Dutch (nl): ~300+ terms - Netherlands Dutch and Belgian Dutch (Flemish)
 *
 * Total terms: ~4900+
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const unwrapDefault = (mod) => mod.default || mod;

const SPANISH_SLANG = unwrapDefault(require('./slang-spanish.data'));
const ENGLISH_SLANG = unwrapDefault(require('./slang-english.data'));
const FRENCH_SLANG = unwrapDefault(require('./slang-french.data'));
const ITALIAN_SLANG = unwrapDefault(require('./slang-italian.data'));
const PORTUGUESE_SLANG = unwrapDefault(require('./slang-portuguese.data'));
const GERMAN_SLANG = unwrapDefault(require('./slang-german.data'));
const DUTCH_SLANG = unwrapDefault(require('./slang-dutch.data'));

/**
 * Combined slang dictionaries export
 */
const SLANG_WORDS = {
    es: SPANISH_SLANG,
    en: ENGLISH_SLANG,
    fr: FRENCH_SLANG,
    it: ITALIAN_SLANG,
    pt: PORTUGUESE_SLANG,
    de: GERMAN_SLANG,
    nl: DUTCH_SLANG,
};

module.exports = {
    SLANG_WORDS,
    SPANISH_SLANG,
    ENGLISH_SLANG,
    FRENCH_SLANG,
    ITALIAN_SLANG,
    PORTUGUESE_SLANG,
    GERMAN_SLANG,
    DUTCH_SLANG,
};
