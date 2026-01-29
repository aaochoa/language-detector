/* eslint-disable no-console */
/**
 * Prepare training data from downloaded datasets
 *
 * Usage: npm run prepare-data
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const zlib = require('zlib');

const CONFIG = {
   languages: ['es', 'en', 'fr'],
   maxSamplesPerLanguage: 500000, // Use up to 500k samples per language
   minTextLength: 5,
   maxTextLength: 500,
};

const RAW_DIR = path.join(__dirname, '../data/raw');
const PROCESSED_DIR = path.join(__dirname, '../data/processed');

/**
 * Ensure directory exists
 */
function ensureDir(dirPath) {
   if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
   }
}

/**
 * Find first existing file from a list of paths
 */
function findExistingFile(filePaths) {
   return filePaths.find((f) => fs.existsSync(f)) || null;
}

/**
 * Read lines from a stream using readline
 */
function readLinesFromStream(stream, maxLines, validator) {
   return new Promise((resolve, reject) => {
      const texts = [];
      const rl = readline.createInterface({
         input: stream,
         crlfDelay: Infinity,
      });

      rl.on('line', (line) => {
         if (texts.length >= maxLines) {
            rl.close();
            return;
         }

         const result = validator(line);
         if (result !== null) {
            texts.push(result);
         }
      });

      rl.on('close', () => resolve(texts));
      rl.on('error', reject);
   });
}

/**
 * Process OpenSubtitles file
 * Format: one sentence per line
 */
async function processOpenSubtitles(lang) {
   // Check for both .txt.gz and .gz extensions (download may use either)
   const files = [
      path.join(RAW_DIR, 'openSubtitles', `${lang}.txt.gz`),
      path.join(RAW_DIR, 'openSubtitles', `${lang}.gz`),
   ];

   const filePath = findExistingFile(files);
   if (!filePath) {
      console.log(`  No OpenSubtitles data for ${lang}`);
      return [];
   }

   console.log(`  Processing: ${path.basename(filePath)}`);

   // Decompress the gzipped file before reading lines
   const stream = fs.createReadStream(filePath).pipe(zlib.createGunzip());

   const validator = (line) => {
      const text = line.trim();
      if (text.length >= CONFIG.minTextLength && text.length <= CONFIG.maxTextLength) {
         return text;
      }
      return null;
   };

   return readLinesFromStream(stream, CONFIG.maxSamplesPerLanguage, validator);
}

/**
 * Process Tatoeba TSV file
 * Format: id \t lang \t text
 */
async function processTatoeba(lang) {
   // Tatoeba files can be: lang.tsv, lang (decompressed from .bz2), or lang.tsv.bz2
   const files = [
      path.join(RAW_DIR, 'tatoeba', `${lang}.tsv`),
      path.join(RAW_DIR, 'tatoeba', `${lang}`), // Decompressed file without extension
   ];

   const filePath = findExistingFile(files);

   if (!filePath) {
      console.log(`  No Tatoeba data for ${lang}`);
      return [];
   }

   console.log(`  Processing: ${path.basename(filePath)}`);

   const stream = fs.createReadStream(filePath);

   const validator = (line) => {
      const parts = line.split('\t');
      if (parts.length >= 3) {
         const text = parts[2].trim();
         if (text.length >= CONFIG.minTextLength && text.length <= CONFIG.maxTextLength) {
            return text;
         }
      }
      return null;
   };

   return readLinesFromStream(stream, CONFIG.maxSamplesPerLanguage, validator);
}

/**
 * Process Hugging Face CSV file
 * Format: CSV with 'text' and 'labels' columns
 */
async function processHuggingFace(lang) {
   const files = [
      path.join(RAW_DIR, 'huggingface', 'train.csv'),
      path.join(RAW_DIR, 'huggingface', 'test.csv'),
   ];

   const texts = [];

   const processFile = async (filePath) => {
      if (!fs.existsSync(filePath)) {
         return [];
      }

      console.log(`  Processing: ${path.basename(filePath)}`);
      const stream = fs.createReadStream(filePath);

      const validator = (line) => {
         // Skip header
         if (line.startsWith('labels,') || line.startsWith('text,')) {
            return null;
         }

         // CSV format: labels,text or text,labels
         // Try to parse - the format is: lang,text
         const firstComma = line.indexOf(',');
         if (firstComma === -1) {
            return null;
         }

         const label = line.substring(0, firstComma).trim();
         const text = line
            .substring(firstComma + 1)
            .trim()
            .replace(/^"|"$/g, '');

         // Check if this matches our target language
         const isTargetLang = label === lang;
         const isValidLength =
            text.length >= CONFIG.minTextLength && text.length <= CONFIG.maxTextLength;

         if (isTargetLang && isValidLength) {
            return text;
         }
         return null;
      };

      return readLinesFromStream(stream, CONFIG.maxSamplesPerLanguage, validator);
   };

   const fileResults = await Promise.all(files.map((f) => processFile(f)));
   fileResults.forEach((result) => texts.push(...result));

   return texts;
}

/**
 * Process Leipzig Corpus file
 * Format: tar.gz containing sentences file
 */
async function processLeipzig(lang) {
   const filePath = path.join(RAW_DIR, 'leipzig', `${lang}.gz`);

   if (!fs.existsSync(filePath)) {
      console.log(`  No Leipzig data for ${lang}`);
      return [];
   }

   console.log(`  Processing: ${path.basename(filePath)}`);

   // Leipzig .gz files are gzipped tar archives, need special handling
   // For now, let's check if there's a decompressed version
   const decompressedPath = path.join(RAW_DIR, 'leipzig', `${lang}.txt`);
   if (fs.existsSync(decompressedPath)) {
      const stream = fs.createReadStream(decompressedPath);

      const validator = (line) => {
         const text = line.trim();
         if (text.length >= CONFIG.minTextLength && text.length <= CONFIG.maxTextLength) {
            if (!text.startsWith('<') && !text.match(/^\d+\t/)) {
               return text;
            }
         }
         return null;
      };

      return readLinesFromStream(stream, CONFIG.maxSamplesPerLanguage, validator);
   }

   // Try reading as gzip directly (might be plain gzip, not tar.gz)
   try {
      const stream = fs.createReadStream(filePath).pipe(zlib.createGunzip());

      const validator = (line) => {
         // Leipzig format: number \t sentence
         const parts = line.split('\t');
         const text = (parts.length >= 2 ? parts[1] : parts[0]).trim();
         if (text.length >= CONFIG.minTextLength && text.length <= CONFIG.maxTextLength) {
            if (!text.match(/^\d+$/) && !text.startsWith('<')) {
               return text;
            }
         }
         return null;
      };

      return readLinesFromStream(stream, CONFIG.maxSamplesPerLanguage, validator);
   } catch (err) {
      console.log(`  Leipzig file is tar.gz format - manual extraction needed`);
      console.log(`  Run: cd data/raw/leipzig && tar -xzf ${lang}.gz`);
      return [];
   }
}

/**
 * Process TED2020 file
 * Format: one sentence per line (gzipped)
 */
async function processTed2020(lang) {
   // Check for both .txt.gz and .gz extensions (download may use either)
   const files = [
      path.join(RAW_DIR, 'ted2020', `${lang}.txt.gz`),
      path.join(RAW_DIR, 'ted2020', `${lang}.gz`),
   ];

   const filePath = findExistingFile(files);
   if (!filePath) {
      console.log(`  No TED2020 data for ${lang}`);
      return [];
   }

   console.log(`  Processing: ${path.basename(filePath)}`);

   // Decompress the gzipped file before reading lines
   const stream = fs.createReadStream(filePath).pipe(zlib.createGunzip());

   const validator = (line) => {
      const text = line.trim();
      // Filter out metadata lines and very short/long sentences
      if (
         text.length >= CONFIG.minTextLength &&
         text.length <= CONFIG.maxTextLength &&
         !text.startsWith('<') &&
         !text.startsWith('(')
      ) {
         return text;
      }
      return null;
   };

   return readLinesFromStream(stream, CONFIG.maxSamplesPerLanguage, validator);
}

/**
 * Process QED (Question-answer Educational Dialogues) dataset
 * Format: one sentence per line (gzipped)
 */
async function processQed(lang) {
   const files = [
      path.join(RAW_DIR, 'qed', `${lang}.txt.gz`),
      path.join(RAW_DIR, 'qed', `${lang}.gz`),
   ];

   const filePath = findExistingFile(files);
   if (!filePath) {
      console.log(`  No QED data for ${lang}`);
      return [];
   }

   console.log(`  Processing: ${path.basename(filePath)}`);
   const stream = fs.createReadStream(filePath).pipe(zlib.createGunzip());

   const validator = (line) => {
      const text = line.trim();
      if (text.length >= CONFIG.minTextLength && text.length <= CONFIG.maxTextLength) {
         return text;
      }
      return null;
   };

   return readLinesFromStream(stream, CONFIG.maxSamplesPerLanguage, validator);
}

/**
 * Process Ubuntu IRC chat logs
 * Format: one message per line (gzipped) - very informal chat
 */
async function processUbuntu(lang) {
   const files = [
      path.join(RAW_DIR, 'ubuntu', `${lang}.txt.gz`),
      path.join(RAW_DIR, 'ubuntu', `${lang}.gz`),
   ];

   const filePath = findExistingFile(files);
   if (!filePath) {
      console.log(`  No Ubuntu data for ${lang}`);
      return [];
   }

   console.log(`  Processing: ${path.basename(filePath)}`);
   const stream = fs.createReadStream(filePath).pipe(zlib.createGunzip());

   const validator = (line) => {
      let text = line.trim();

      // Clean IRC-style messages (remove timestamps, usernames, etc.)
      text = text
         .replace(/^\[\d{2}:\d{2}\]\s*/, '') // Remove timestamps
         .replace(/^<[^>]+>\s*/, '') // Remove <username>
         .replace(/^\*\s*\w+\s+/, '') // Remove * username actions
         .trim();

      if (text.length >= CONFIG.minTextLength && text.length <= CONFIG.maxTextLength) {
         // Skip system messages
         if (
            !text.startsWith('---') &&
            !text.includes(' has joined ') &&
            !text.includes(' has left ')
         ) {
            return text;
         }
      }
      return null;
   };

   return readLinesFromStream(stream, CONFIG.maxSamplesPerLanguage, validator);
}

/**
 * Load sample data if no downloaded data exists
 */
function getSampleData() {
   return {
      es: [
         'hola como estas',
         'buenos dias amigo',
         'que tal todo bien',
         'me gusta mucho esto',
         'gracias por tu ayuda',
         'hasta luego nos vemos',
         'que tengas un buen dia',
         'necesito ayuda con esto',
         'puedes enviarme la informacion',
         'muchas gracias por todo',
         'donde estas ahora mismo',
         'cuando llegaste a casa',
         'porque no me llamaste',
         'vamos a comer algo',
         'te espero en la entrada',
         'no entiendo lo que dices',
         'me puedes repetir por favor',
         'estoy muy cansado hoy',
         'mañana tengo que trabajar',
         'el fin de semana vamos al cine',
      ],
      en: [
         'hello how are you',
         'good morning friend',
         'how is everything going',
         'i really like this',
         'thank you for your help',
         'see you later goodbye',
         'have a great day',
         'i need help with this',
         'can you send me the information',
         'thank you so much',
         'where are you right now',
         'when did you get home',
         'why didnt you call me',
         'lets go get something to eat',
         'ill wait for you at the entrance',
         'i dont understand what youre saying',
         'can you repeat that please',
         'im very tired today',
         'tomorrow i have to work',
         'this weekend were going to the movies',
      ],
      fr: [
         'bonjour comment allez vous',
         'salut ca va bien',
         'merci beaucoup pour tout',
         'je suis tres fatigue',
         'ou es tu maintenant',
         'quand est ce que tu arrives',
         'pourquoi tu ne reponds pas',
         'on va manger quelque chose',
         'je tattends a lentree',
         'je ne comprends pas ce que tu dis',
         'tu peux repeter sil te plait',
         'demain je dois travailler',
         'ce week end on va au cinema',
         'jai besoin daide avec ca',
         'peux tu menvoyer les informations',
         'a bientot a la prochaine',
         'bonne journee mon ami',
         'quest ce que tu fais ce soir',
         'je taime beaucoup',
         'cest vraiment super genial',
      ],
   };
}

/**
 * Safely concatenate arrays without stack overflow
 * Uses a loop to avoid call stack issues with large arrays
 */
function safeConcat(target, source) {
   // Use a loop to avoid stack overflow with spread/apply on large arrays
   for (let i = 0; i < source.length; i += 1) {
      target.push(source[i]);
   }
}

/**
 * Process a single language
 */
async function processLanguage(lang, allData) {
   console.log(`\nProcessing ${lang}...`);
   allData[lang] = [];

   // Try Tatoeba
   const tatoebaData = await processTatoeba(lang);
   safeConcat(allData[lang], tatoebaData);
   console.log(`  Tatoeba: ${tatoebaData.length} samples`);

   // Try Hugging Face
   const hfData = await processHuggingFace(lang);
   safeConcat(allData[lang], hfData);
   console.log(`  HuggingFace: ${hfData.length} samples`);

   // Try Leipzig
   const leipzigData = await processLeipzig(lang);
   safeConcat(allData[lang], leipzigData);
   console.log(`  Leipzig: ${leipzigData.length} samples`);

   // Try TED2020
   const tedData = await processTed2020(lang);
   safeConcat(allData[lang], tedData);
   console.log(`  TED2020: ${tedData.length} samples`);

   // Try OpenSubtitles
   const subtitlesData = await processOpenSubtitles(lang);
   safeConcat(allData[lang], subtitlesData);
   console.log(`  OpenSubtitles: ${subtitlesData.length} samples`);

   // Try QED (conversational Q&A)
   const qedData = await processQed(lang);
   safeConcat(allData[lang], qedData);
   console.log(`  QED: ${qedData.length} samples`);

   // Try Ubuntu IRC (very informal chat)
   const ubuntuData = await processUbuntu(lang);
   safeConcat(allData[lang], ubuntuData);
   console.log(`  Ubuntu: ${ubuntuData.length} samples`);

   // If no data, use sample data
   if (allData[lang].length === 0) {
      console.log('  Using sample data (download real data for production)');
      const samples = getSampleData();
      allData[lang] = samples[lang] || [];
   }

   // Remove duplicates and limit - use Set but avoid spread on large arrays
   console.log(`  Removing duplicates from ${allData[lang].length} samples...`);
   const uniqueSet = new Set(allData[lang]);
   allData[lang] = Array.from(uniqueSet).slice(0, CONFIG.maxSamplesPerLanguage);
   console.log(`  Total unique: ${allData[lang].length} samples`);

   // Save to file
   const outputPath = path.join(PROCESSED_DIR, `${lang}.json`);
   fs.writeFileSync(outputPath, JSON.stringify(allData[lang], null, 2));
   console.log(`  Saved: ${outputPath}`);
}

/**
 * Process languages sequentially using recursion
 */
async function processLanguagesSequentially(languages, allData, index = 0) {
   if (index >= languages.length) {
      return;
   }

   await processLanguage(languages[index], allData);
   await processLanguagesSequentially(languages, allData, index + 1);
}

/**
 * Main function
 */
async function main() {
   console.log('=== Language Detector - Data Preparation ===\n');

   ensureDir(PROCESSED_DIR);

   const allData = {};

   await processLanguagesSequentially(CONFIG.languages, allData);

   console.log('\n=== Data Preparation Complete ===');
   console.log(`Data saved to: ${PROCESSED_DIR}`);
   console.log('\nNext step: npm run train');
}

main().catch((error) => {
   console.error('Preparation failed:', error.message);
   throw error;
});
