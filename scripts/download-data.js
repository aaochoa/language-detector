/* eslint-disable no-console */
/**
 * Download training datasets from public sources
 *
 * Usage: npm run download-data
 *
 * Datasets:
 * - Tatoeba: Short sentences from language learners (best for messaging)
 * - OpenSubtitles: Movie/TV subtitles (conversational text)
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const DATASETS = {
   // ⭐ RECOMMENDED: Best for conversational/chat text
   openSubtitles: {
      description: 'Movie/TV subtitles - closest to real chat patterns',
      priority: 1,
      files: {
         es: 'https://object.pouta.csc.fi/OPUS-OpenSubtitles/v2018/mono/es.txt.gz',
         en: 'https://object.pouta.csc.fi/OPUS-OpenSubtitles/v2018/mono/en.txt.gz',
         fr: 'https://object.pouta.csc.fi/OPUS-OpenSubtitles/v2018/mono/fr.txt.gz',
         it: 'https://object.pouta.csc.fi/OPUS-OpenSubtitles/v2018/mono/it.txt.gz',
      },
   },

   // ⭐ RECOMMENDED: Clean short sentences
   tatoeba: {
      description: 'Short sentences from language learners - clean labels',
      priority: 2,
      files: {
         es: 'https://downloads.tatoeba.org/exports/per_language/spa/spa_sentences.tsv.bz2',
         en: 'https://downloads.tatoeba.org/exports/per_language/eng/eng_sentences.tsv.bz2',
         fr: 'https://downloads.tatoeba.org/exports/per_language/fra/fra_sentences.tsv.bz2',
         it: 'https://downloads.tatoeba.org/exports/per_language/ita/ita_sentences.tsv.bz2',
      },
   },

   // Good for evaluation/benchmarking
   huggingface: {
      description: 'Pre-labeled language identification dataset',
      priority: 3,
      files: {
         train: 'https://huggingface.co/datasets/papluca/language-identification/resolve/main/train.csv',
         test: 'https://huggingface.co/datasets/papluca/language-identification/resolve/main/test.csv',
      },
   },

   // Mixed formal/informal content
   leipzig: {
      description: 'News + web sentences - good variety',
      priority: 4,
      files: {
         es: 'https://downloads.wortschatz-leipzig.de/corpora/spa_news_2020_30K.tar.gz',
         en: 'https://downloads.wortschatz-leipzig.de/corpora/eng_news_2020_30K.tar.gz',
         fr: 'https://downloads.wortschatz-leipzig.de/corpora/fra_news_2020_30K.tar.gz',
         it: 'https://downloads.wortschatz-leipzig.de/corpora/ita_news_2020_30K.tar.gz',
      },
   },

   // TED Talks - conversational spoken language transcriptions
   ted2020: {
      description: 'TED Talk transcriptions - natural spoken language',
      priority: 5,
      files: {
         es: 'https://object.pouta.csc.fi/OPUS-TED2020/v1/mono/es.txt.gz',
         en: 'https://object.pouta.csc.fi/OPUS-TED2020/v1/mono/en.txt.gz',
         fr: 'https://object.pouta.csc.fi/OPUS-TED2020/v1/mono/fr.txt.gz',
         it: 'https://object.pouta.csc.fi/OPUS-TED2020/v1/mono/it.txt.gz',
      },
   },

   // ⭐ RECOMMENDED: Very informal conversational text
   qed: {
      description: 'Q&A educational dialogues - conversational informal text',
      priority: 6,
      files: {
         // OPUS QED - Question-answer educational dialogues (informal)
         es: 'https://object.pouta.csc.fi/OPUS-QED/v2.0a/mono/es.txt.gz',
         en: 'https://object.pouta.csc.fi/OPUS-QED/v2.0a/mono/en.txt.gz',
         fr: 'https://object.pouta.csc.fi/OPUS-QED/v2.0a/mono/fr.txt.gz',
         it: 'https://object.pouta.csc.fi/OPUS-QED/v2.0a/mono/it.txt.gz',
      },
   },

   // Informal chat-like text from software communities
   ubuntu: {
      description: 'Ubuntu IRC chat logs - very informal tech chat',
      priority: 7,
      files: {
         en: 'https://object.pouta.csc.fi/OPUS-Ubuntu/v14.10/mono/en.txt.gz',
         es: 'https://object.pouta.csc.fi/OPUS-Ubuntu/v14.10/mono/es.txt.gz',
         fr: 'https://object.pouta.csc.fi/OPUS-Ubuntu/v14.10/mono/fr.txt.gz',
         it: 'https://object.pouta.csc.fi/OPUS-Ubuntu/v14.10/mono/it.txt.gz',
      },
   },
};

const DATA_DIR = path.join(__dirname, '../data/raw');

/**
 * Ensure directory exists
 */
function ensureDir(dirPath) {
   if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Created directory: ${dirPath}`);
   }
}

/**
 * Format bytes to human readable
 */
function formatBytes(bytes) {
   if (bytes === 0) {
      return '0 B';
   }
   const k = 1024;
   const sizes = ['B', 'KB', 'MB', 'GB'];
   const i = Math.floor(Math.log(bytes) / Math.log(k));
   return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
}

/**
 * Download a file from URL with progress
 */
async function downloadFile(url, outputPath) {
   console.log(`\nDownloading: ${url}`);
   console.log(`  -> ${outputPath}`);

   try {
      const response = await axios({
         method: 'get',
         url,
         responseType: 'stream',
         timeout: 600000, // 10 minutes timeout for large files
         headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; LanguageDetector/1.0)',
         },
      });

      const totalLength = parseInt(response.headers['content-length'], 10) || 0;
      let downloadedLength = 0;

      const writer = fs.createWriteStream(outputPath);

      response.data.on('data', (chunk) => {
         downloadedLength += chunk.length;
         if (totalLength > 0) {
            const percent = ((downloadedLength / totalLength) * 100).toFixed(1);
            process.stdout.write(
               `\r  Progress: ${percent}% (${formatBytes(downloadedLength)} / ${formatBytes(totalLength)})`,
            );
         } else {
            process.stdout.write(`\r  Downloaded: ${formatBytes(downloadedLength)}`);
         }
      });

      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
         writer.on('finish', () => {
            console.log(`\n  ✓ Downloaded: ${path.basename(outputPath)}`);
            resolve();
         });
         writer.on('error', (err) => {
            fs.unlink(outputPath, () => {}); // Clean up partial file
            reject(err);
         });
         response.data.on('error', (err) => {
            fs.unlink(outputPath, () => {}); // Clean up partial file
            reject(err);
         });
      });
   } catch (error) {
      // Clean up partial file on error
      if (fs.existsSync(outputPath)) {
         fs.unlinkSync(outputPath);
      }
      console.error(`\n  ✗ Failed: ${error.message}`);
      throw error;
   }
}

/**
 * Download a single language file
 */
async function downloadLanguageFile(lang, url, sourceDir) {
   // Get extension from URL
   const urlPath = new URL(url).pathname;
   const ext = path.extname(urlPath);
   const filename = `${lang}${ext}`;
   const outputPath = path.join(sourceDir, filename);

   // Skip if already downloaded
   if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      console.log(`\n  Skipping ${lang}: already exists (${formatBytes(stats.size)})`);
      return { lang, status: 'skipped' };
   }

   try {
      await downloadFile(url, outputPath);
      return { lang, status: 'success' };
   } catch (error) {
      console.warn(`  Skipping ${lang}: ${error.message}`);
      return { lang, status: 'error', error: error.message };
   }
}

/**
 * Download datasets for a specific source
 */
async function downloadDataset(sourceName, source) {
   console.log(`\n${'='.repeat(50)}`);
   console.log(`Downloading: ${sourceName}`);
   console.log(`Description: ${source.description}`);
   console.log('='.repeat(50));

   const sourceDir = path.join(DATA_DIR, sourceName);
   ensureDir(sourceDir);

   // Download files sequentially to avoid overwhelming the server
   const results = [];
   const entries = Object.entries(source.files);

   // Process sequentially
   async function processNext(index) {
      if (index >= entries.length) {
         return;
      }
      const [lang, url] = entries[index];
      const result = await downloadLanguageFile(lang, url, sourceDir);
      results.push(result);
      await processNext(index + 1);
   }

   await processNext(0);
   return results;
}

/**
 * Show available datasets
 */
function showHelp() {
   console.log('Usage: npm run download-data [dataset...]');
   console.log('\nAvailable datasets:');
   Object.entries(DATASETS).forEach(([name, source]) => {
      console.log(`  ${name}: ${source.description}`);
      console.log(`    Languages: ${Object.keys(source.files).join(', ')}`);
   });
   console.log('\nExamples:');
   console.log('  npm run download-data           # Download all datasets');
   console.log('  npm run download-data tatoeba   # Download only Tatoeba');
}

/**
 * Main function
 */
async function main() {
   console.log('=== Language Detector - Data Download ===\n');

   // Check for help flag
   if (process.argv.includes('--help') || process.argv.includes('-h')) {
      showHelp();
      return;
   }

   ensureDir(DATA_DIR);

   // Check which datasets to download
   const args = process.argv.slice(2).filter((arg) => !arg.startsWith('-'));
   const datasetsToDownload = args.length > 0 ? args : Object.keys(DATASETS);

   let successCount = 0;
   let errorCount = 0;

   // Process datasets sequentially
   async function processDatasets(index) {
      if (index >= datasetsToDownload.length) {
         return;
      }

      const sourceName = datasetsToDownload[index];

      if (DATASETS[sourceName]) {
         try {
            await downloadDataset(sourceName, DATASETS[sourceName]);
            successCount += 1;
         } catch (error) {
            errorCount += 1;
            console.error(`Failed to download ${sourceName}: ${error.message}`);
         }
      } else {
         console.warn(`Unknown dataset: ${sourceName}`);
         console.log('Run with --help to see available datasets');
         errorCount += 1;
      }

      await processDatasets(index + 1);
   }

   await processDatasets(0);

   console.log(`\n${'='.repeat(50)}`);
   console.log('=== Download Complete ===');
   console.log(`Data saved to: ${DATA_DIR}`);
   console.log(`Success: ${successCount}, Errors: ${errorCount}`);

   if (successCount > 0) {
      console.log('\nNote: Downloaded files are compressed.');
      console.log('  - .bz2 files: Run "bunzip2 <file>" to decompress');
      console.log('  - .gz files: Will be auto-decompressed during prepare-data');
      console.log('\nNext step: npm run prepare-data');
   }
}

main().catch((error) => {
   console.error('Download failed:', error.message);
   throw error;
});
