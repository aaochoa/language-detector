/* eslint-disable global-require, prefer-destructuring */
/**
 * Slang Dictionaries for Language Detection
 *
 * Contains texting slang, abbreviations, and informal language patterns
 * for multiple languages. Used to improve language detection accuracy
 * for informal/casual text messages.
 *
 * Note: This file re-exports the JavaScript slang dictionaries.
 * The actual dictionaries are maintained in slang-dictionaries.data.js
 * due to their large size (~3000 lines).
 */

import type { SlangDictionary } from '../types';

// Import from the JavaScript file
// eslint-disable-next-line @typescript-eslint/no-var-requires
const slangData = require('./slang-dictionaries.data') as {
   SPANISH_SLANG: Set<string>;
   ENGLISH_SLANG: Set<string>;
   SLANG_WORDS: SlangDictionary;
};

/**
 * Spanish texting slang and informal abbreviations
 */
export const SPANISH_SLANG: Set<string> = slangData.SPANISH_SLANG;

/**
 * English texting slang and informal abbreviations
 */
export const ENGLISH_SLANG: Set<string> = slangData.ENGLISH_SLANG;

/**
 * Combined slang dictionaries export
 */
export const SLANG_WORDS: SlangDictionary = slangData.SLANG_WORDS;
