# Gaussian Naive Bayes - Language Detector

[![npm version](https://img.shields.io/npm/v/naive-bayes-language-detector.svg)](https://www.npmjs.com/package/naive-bayes-language-detector)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

A **Naive Bayes language detector** optimized for short, informal text like SMS and chat messages. Built with [TypeScript](https://www.typescriptlang.org/) and powered by [TF-IDF](https://en.wikipedia.org/wiki/Tf%E2%80%93idf) vectorization and [Gaussian Naive Bayes](https://en.wikipedia.org/wiki/Naive_Bayes_classifier#Gaussian_naive_Bayes) classification.

## Supported Languages

| Code | Language   | Flag   | Slang Terms | Regional Support                                                                                          |
| ---- | ---------- | ------ | ----------- | --------------------------------------------------------------------------------------------------------- |
| `en` | English    | 🇺🇸🇬🇧   | ~1,300+     | US, UK, Gen-Z, Gaming, [AAVE](https://en.wikipedia.org/wiki/African-American_Vernacular_English), texting |
| `es` | Spanish    | 🇪🇸🇲🇽   | ~1,800+     | Mexico, Spain, Argentina, Colombia, Venezuela, Chile, Caribbean                                           |
| `fr` | French     | 🇫🇷     | ~300+       | Standard French, SMS abbreviations (mdr, ptdr, slt, tkt)                                                  |
| `it` | Italian    | 🇮🇹     | ~350+       | Standard Italian, regional variants (cmq, tvb, xke)                                                       |
| `pt` | Portuguese | 🇧🇷🇵🇹   | ~500+       | Brazilian (pt-BR) & European (pt-PT) Portuguese                                                           |
| `de` | German     | 🇩🇪🇦🇹🇨🇭 | ~400+       | Standard German, Austrian, Swiss German, youth slang (Jugendsprache)                                      |
| `nl` | Dutch      | 🇳🇱🇧🇪   | ~300+       | Netherlands Dutch and Belgian Dutch (Flemish)                                                             |

**Total: ~4,900+ slang terms** across all languages for improved informal text detection.

## Features

- ✅ **Optimized for short text**: Works well with SMS and chat messages (1-50 words)
- ✅ **Handles informal language**: Supports slang, abbreviations, and texting patterns
- ✅ **Multi-language support**: 7 languages with regional variations
- ✅ **Language filtering**: Restrict detection to specific languages with "neither" detection
- ✅ **Fast inference**: <5ms per detection, suitable for real-time applications
- ✅ **TypeScript support**: Full type definitions included
- ✅ **Slang dictionary fallback**: Comprehensive detection for ambiguous cases
- ✅ **Zero dependencies at runtime**: Lightweight and self-contained

## Installation

```bash
npm install naive-bayes-language-detector
```

## Quick Start

```typescript
import { getDetector } from 'naive-bayes-language-detector';

// Load the default (large) model — no path needed
const detector = getDetector();

// Or choose a specific size: 'small' | 'medium' | 'large'
const detector = getDetector('small');

// Detect language
const result = detector.detect('Hola, ¿cómo estás?');
console.log(result);
// {
//     language: 'es',
//     confidence: 0.95,
//     isReliable: true,
//     probabilities: { es: 0.95, en: 0.01, fr: 0.02, it: 0.01, pt: 0.005, de: 0.005, nl: 0.0 },
//     source: 'ml'
// }

// Batch detection
const results = detector.detectBatch(['hello', 'hola', 'bonjour', 'ciao', 'oi']);
```

## Model Sizes

Three pre-trained models are bundled with the package, trading off size and speed against accuracy:

| Size     | Vocabulary | Accuracy           | Model size |
| -------- | ---------- | ------------------ | ---------- |
| `small`  | 1,000      | 97.21% (1116/1148) | ~0.4 MB    |
| `medium` | 3,000      | 99.48% (1142/1148) | ~1.1 MB    |
| `large`  | 5,000      | 99.39% (1141/1148) | ~1.7 MB    |

```typescript
import { getDetector, getModelPath } from 'naive-bayes-language-detector';

// Each size is a separate singleton — they can coexist
const small = getDetector('small');
const medium = getDetector('medium');
const large = getDetector('large'); // same as getDetector()

// Resolve a model's file path without loading it
const p = getModelPath('medium'); // → .../dist/models/language-model-medium.min.json
```

## API Reference

### `getDetector(size?: ModelSize): LanguageDetector`

Get or create a singleton detector instance for the given model size. Defaults to `'large'`.

```typescript
const detector = getDetector(); // large (default)
const detector = getDetector('small'); // small
const detector = getDetector('medium'); // medium
```

### `getModelPath(size?: ModelSize): string`

Resolve the absolute path of a bundled model file without loading it.

```typescript
const p = getModelPath('large'); // → .../dist/models/language-model-large.min.json
```

### `LanguageDetector.detect(text: string): DetectionResult`

Detect the language of a single text.

```typescript
interface DetectionResult {
    language: string; // Detected language code ('en', 'es', 'fr', 'it', 'pt', 'de', 'nl')
    confidence: number; // Confidence score (0-1)
    isReliable: boolean; // True if confidence > 0.7
    probabilities?: Record<string, number>; // Probability per language
    source?: 'ml' | 'slang' | 'slang-override' | 'combined';
}
```

### `LanguageDetector.detectBatch(texts: string[]): DetectionResult[]`

Detect languages for multiple texts efficiently.

### `LanguageDetector.setAllowedLanguages(languages, options?): this`

Restrict detection to specific languages only. Useful when you only care about certain languages.

```typescript
// Only detect English or Spanish
detector.setAllowedLanguages(['en', 'es']);

// With fast mode for better performance (skips "neither" detection)
detector.setAllowedLanguages(['en', 'es'], { fastMode: true });
```

**Options:**

| Option     | Type      | Default | Description                                                                                        |
| ---------- | --------- | ------- | -------------------------------------------------------------------------------------------------- |
| `fastMode` | `boolean` | `false` | When `true`, only computes probabilities for allowed languages (faster but no "neither" detection) |

**Behavior:**

| Scenario                             | `fastMode: false` (default)         | `fastMode: true`                    |
| ------------------------------------ | ----------------------------------- | ----------------------------------- |
| Text matches allowed language        | High confidence, `isReliable: true` | High confidence, `isReliable: true` |
| Text doesn't match allowed languages | Low confidence, `isReliable: false` | High confidence (re-normalized)     |

```typescript
detector.setAllowedLanguages(['en', 'es']);

// Spanish text - detected correctly
detector.detect('Hola amigo');
// { language: 'es', confidence: 0.95, isReliable: true }

// French text with en/es filter - "neither" case
detector.detect('Bonjour!');
// { language: 'en', confidence: 0.12, isReliable: false }
// Low confidence indicates text doesn't really match allowed languages
```

### `LanguageDetector.clearAllowedLanguages(): this`

Remove language restrictions and detect all supported languages again.

```typescript
detector.clearAllowedLanguages();
// Now detects all 7 languages
```

### `LanguageDetector.allowedLanguages: string[] | null`

Get the currently allowed languages. Returns `null` if all languages are allowed.

### `LanguageDetector.fastMode: boolean`

Get whether fast mode is enabled.

### `resetDetector(size?: ModelSize): void`

Reset singleton instances (useful for testing). Pass a size to reset only that instance, or omit to reset all.

```typescript
resetDetector('small'); // reset only the small instance
resetDetector(); // reset all instances
```

## How It Works

### Architecture

```text
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Input Text    │ ──▶ │ Text Normalizer │ ──▶ │TF-IDF Vectorizer│
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                         │
                                                         ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Detection      │ ◀── │ Slang Detection │ ◀── │ Naive Bayes     │
│  Result         │     │ (fallback)      │     │ Classifier      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### TF-IDF Vectorizer

Converts text to numerical vectors using character [n-grams](https://en.wikipedia.org/wiki/N-gram) (2-5 characters).

```typescript
import { TfidfVectorizer } from 'naive-bayes-language-detector';

const vectorizer = new TfidfVectorizer({
    minN: 2, // Minimum n-gram size
    maxN: 5, // Maximum n-gram size
    maxFeatures: 5000, // Vocabulary limit
});

vectorizer.fit(trainingTexts);
const vector = vectorizer.transform('hello world');
```

### Naive Bayes Classifier

[Gaussian Naive Bayes](https://scikit-learn.org/stable/modules/naive_bayes.html#gaussian-naive-bayes) classifier for language prediction.

```typescript
import { NaiveBayesClassifier } from 'naive-bayes-language-detector';

const classifier = new NaiveBayesClassifier();
classifier.fit(vectors, labels);
const prediction = classifier.predict(vector);
```

### Slang Detection

For short/ambiguous texts, the detector uses comprehensive slang dictionaries:

| Language   | Examples                                        |
| ---------- | ----------------------------------------------- |
| English    | lol, bruh, ngl, fr, lowkey, bussin, innit, mate |
| Spanish    | wey, neta, chido, parce, bacano, po, cachai     |
| French     | mdr, ptdr, slt, tkt, jsp, bcp, cv               |
| Italian    | cmq, tvb, xke, nn, qlc, grz                     |
| Portuguese | kkk, blz, vlw, tmj, mano, bora, fixe            |
| German     | digga, krass, geil, oida, leiwand, hdl, vllt    |
| Dutch      | doei, tof, gezellig, idd, sws, aub, ff, jeetje  |

## Training Your Own Model

### 1. Download Training Data

```bash
npm run download-data
```

Downloads data from multiple sources:

| Source                                                  | Description                      | Link                                                 |
| ------------------------------------------------------- | -------------------------------- | ---------------------------------------------------- |
| [Tatoeba](https://tatoeba.org/)                         | Community-sourced sentence pairs | [tatoeba.org](https://tatoeba.org/)                  |
| [OpenSubtitles](https://opus.nlpl.eu/OpenSubtitles.php) | Movie and TV subtitles           | [opus.nlpl.eu](https://opus.nlpl.eu/)                |
| [Leipzig Corpora](https://wortschatz.uni-leipzig.de/)   | Web and news text                | [uni-leipzig.de](https://wortschatz.uni-leipzig.de/) |
| [TED2020](https://opus.nlpl.eu/TED2020.php)             | TED talk transcripts             | [opus.nlpl.eu](https://opus.nlpl.eu/)                |
| [QED](https://opus.nlpl.eu/QED.php)                     | Educational content              | [opus.nlpl.eu](https://opus.nlpl.eu/)                |
| [Ubuntu](https://opus.nlpl.eu/Ubuntu.php)               | Technical support dialogues      | [opus.nlpl.eu](https://opus.nlpl.eu/)                |

### 2. Prepare Data

```bash
npm run prepare-data
```

Processes raw data, filters by length, and removes duplicates.

### 3. Train Model

```bash
npm run train           # train all three sizes
npm run train:small     # train a specific size
npm run train:medium
npm run train:large
```

Trains TF-IDF + Naive Bayes models using batch processing and saves minified files to `models/language-model-{size}.min.json`.

### 4. Evaluate Model

```bash
npm run evaluate                    # evaluates the large model (default)
npm run evaluate -- --size small    # evaluate a specific size
npm run evaluate -- --size large -i # interactive mode
```

Runs the model against 1148 test cases and reports accuracy.

## Text Normalization

```typescript
import { normalizeText, augmentText } from 'naive-bayes-language-detector';

// Normalize text (lowercase, remove URLs, emails, phone numbers)
const normalized = normalizeText('Hello World! https://example.com');
// 'hello world'

// Augment for training (creates variations with abbreviations)
const variations = augmentText('porque no vienes', 'es');
// ['porque no vienes', 'xq no vienes', ...]
```

## Project Structure

```text
language-detector/
├── src/                    # TypeScript source
│   ├── index.ts           # Main exports
│   ├── types/             # Type definitions
│   ├── utils/             # Utilities (normalization, n-grams, slang)
│   └── inference/         # ML components (vectorizer, classifier, detector)
├── dist/                  # Compiled JavaScript (CommonJS)
├── test/                  # Mocha + Chai test files
├── scripts/               # Training and evaluation scripts
├── models/                # Pre-trained model
│   └── language-model.json
└── data/                  # Training data (not included in npm package)
```

## Type Exports

```typescript
import type {
    LanguageCode, // 'en' | 'es' | 'fr' | 'it' | 'pt' | 'de' | 'nl'
    ModelSize, // 'small' | 'medium' | 'large'
    DetectionResult,
    DetectionSource,
    SlangDetectionResult,
    PredictionResult,
    VectorizerOptions,
    VectorizerData,
    ClassifierData,
    ModelData,
    AllowedLanguagesOptions, // Options for setAllowedLanguages()
} from 'naive-bayes-language-detector';
```

## Development

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run tests
npm test

# Run tests with coverage
npm run coverage

# Lint code
npm run lint
npm run lint:fix

# Training workflow
npm run download-data
npm run prepare-data
npm run train           # all sizes
npm run train:large     # or a specific size
npm run evaluate -- --size large
```

## Tech Stack

| Technology                                                       | Purpose               |
| ---------------------------------------------------------------- | --------------------- |
| [TypeScript](https://www.typescriptlang.org/)                    | Type-safe development |
| [Node.js](https://nodejs.org/)                                   | Runtime environment   |
| [Mocha](https://mochajs.org/) + [Chai](https://www.chaijs.com/)  | Testing framework     |
| [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) | Code quality          |
| [Husky](https://typicode.github.io/husky/)                       | Git hooks             |
| [Airbnb Style Guide](https://github.com/airbnb/javascript)       | Code style            |

## Git Hooks

This project uses [Husky](https://typicode.github.io/husky/) for Git hooks:

- **pre-commit**: Runs `lint-staged` to lint and format staged `.ts` files

```bash
# Hooks are automatically installed when you run npm install
npm install
```

## Requirements

- [Node.js](https://nodejs.org/) >= 20

## Performance

| Metric         | small         | medium        | large                    |
| -------------- | ------------- | ------------- | ------------------------ |
| Inference time | <5ms per text | <5ms per text | <5ms per text            |
| Model size     | ~0.4 MB       | ~1.1 MB       | ~1.7 MB                  |
| Accuracy       | 97.21%        | 99.48%        | 99.39% (1148 test cases) |
| Memory usage   | ~15 MB loaded | ~30 MB loaded | ~50 MB loaded            |

## License

[ISC](https://opensource.org/licenses/ISC)

## Contributing

Contributions are welcome! Please ensure:

1. All tests pass (`npm test`)
2. Code is linted (`npm run lint`)
3. New features include tests

## Maintainers

- [@aaochoa](https://github.com/aaochoa)

---

Made with ❤️ for the messaging community
