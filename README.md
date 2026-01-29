# Language Detector

A **Naive Bayes language detector** optimized for short, informal text like SMS and chat messages. Supports English, Spanish, French, and Italian with high accuracy on informal text.

## Supported Languages

| Code | Language | Slang Support                                                              |
| ---- | -------- | -------------------------------------------------------------------------- |
| `en` | English  | US, UK, Gen-Z, Gaming, AAVE, texting abbreviations                         |
| `es` | Spanish  | Mexico, Spain, Argentina, Colombia, Venezuela, Chile, Caribbean            |
| `fr` | French   | Standard French, SMS/texting abbreviations (mdr, ptdr, slt, tkt)           |
| `it` | Italian  | Standard Italian, regional variants, texting abbreviations (cmq, tvb, xke) |

## Features

- ✅ **Optimized for short text**: Works well with SMS and chat messages
- ✅ **Handles informal language**: Supports slang, abbreviations, and texting patterns
- ✅ **Multi-language support**: English, Spanish, French, and Italian
- ✅ **Fast inference**: Lightweight model suitable for real-time applications
- ✅ **TypeScript support**: Full TypeScript type definitions included
- ✅ **Slang dictionary fallback**: Comprehensive slang detection for ambiguous cases

## Installation

```bash
npm install naive-bayes-language-detector
```

## Quick Start

```typescript
import { getDetector } from 'naive-bayes-language-detector';

// Load the pre-trained model
const detector = getDetector(
   './node_modules/naive-bayes-language-detector/dist/models/language-model.json',
);

// Detect language
const result = detector.detect('Hola, ¿cómo estás?');
console.log(result);
// {
//   language: 'es',
//   confidence: 0.95,
//   isReliable: true,
//   probabilities: { es: 0.95, en: 0.02, fr: 0.02, it: 0.01 },
//   source: 'ml'
// }

// Batch detection
const results = detector.detectBatch(['hello', 'hola', 'bonjour', 'ciao', 'buenos dias']);
```

## API Reference

### `getDetector(modelPath: string): LanguageDetector`

Get or create a singleton detector instance.

```typescript
const detector = getDetector('./models/language-model.json');
```

### `LanguageDetector.detect(text: string): DetectionResult`

Detect the language of a single text.

```typescript
interface DetectionResult {
   language: string; // Detected language code ('en', 'es')
   confidence: number; // Confidence score (0-1)
   isReliable: boolean; // True if confidence > 0.7
   probabilities?: Record<string, number>; // Probability per language
   source?: 'ml' | 'slang' | 'slang-override' | 'combined';
}
```

### `LanguageDetector.detectBatch(texts: string[]): DetectionResult[]`

Detect languages for multiple texts.

### `resetDetector(): void`

Reset the singleton instance (useful for testing).

## Training Your Own Model

### 1. Download Training Data

```bash
npm run download-data
```

This downloads data from multiple sources:

- **Tatoeba**: Community-sourced sentence pairs
- **OpenSubtitles**: Movie and TV subtitles
- **Leipzig Corpora**: Web and news text
- **TED2020**: TED talk transcripts
- **QED**: Educational content
- **Ubuntu**: Technical support dialogues
- **Hugging Face**: Various text datasets

### 2. Prepare Data

```bash
npm run prepare-data
```

Processes raw data, filters by length, and removes duplicates.

### 3. Train Model

```bash
npm run train
```

Trains a TF-IDF + Naive Bayes model and saves to `models/language-model.json`.

### 4. Evaluate Model

```bash
npm run evaluate
```

Runs the model against 337 test cases and reports accuracy.

Interactive mode:

```bash
npm run evaluate -- -i
```

## Architecture

### TF-IDF Vectorizer

Converts text to numerical vectors using character n-grams (2-4 characters).

```typescript
import { TfidfVectorizer } from 'naive-bayes-language-detector';

const vectorizer = new TfidfVectorizer({
   minN: 2, // Minimum n-gram size
   maxN: 4, // Maximum n-gram size
   maxFeatures: 5000, // Vocabulary limit
});

vectorizer.fit(trainingTexts);
const vector = vectorizer.transform('hello world');
```

### Naive Bayes Classifier

Gaussian Naive Bayes classifier for language prediction.

```typescript
import { NaiveBayesClassifier } from 'naive-bayes-language-detector';

const classifier = new NaiveBayesClassifier();
classifier.fit(vectors, labels);
const prediction = classifier.predict(vector);
```

### Slang Detection

For short/ambiguous texts, the detector falls back to a comprehensive slang dictionary with:

- ~1500+ Spanish slang terms (including regional variations)
- ~800+ English slang terms (including AAVE, British, gaming, Gen Z)

## Text Normalization

```typescript
import { normalizeText, augmentText } from 'naive-bayes-language-detector';

// Normalize text (lowercase, remove URLs, emails, emojis)
const normalized = normalizeText('Hello World! https://example.com');
// 'hello world'

// Augment for training (creates variations)
const variations = augmentText('porque no vienes', 'es');
// ['porque no vienes', 'xq no vienes', ...]
```

## Project Structure

```bash
language-detector/
├── src/                    # TypeScript source
│   ├── index.ts           # Main exports
│   ├── types/             # Type definitions
│   ├── utils/             # Utilities (normalization, n-grams, slang)
│   └── inference/         # ML components (vectorizer, classifier, detector)
├── dist/                  # Compiled JavaScript (CommonJS)
├── test/                  # Test files
├── scripts/               # Training and evaluation scripts
├── models/                # Pre-trained model
│   └── language-model.json
└── data/                  # Training data (not included in npm package)
```

## Type Exports

```typescript
import type {
   LanguageCode,
   DetectionResult,
   DetectionSource,
   SlangDetectionResult,
   PredictionResult,
   VectorizerOptions,
   VectorizerData,
   ClassifierData,
   ModelData,
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
npm run train
npm run evaluate
```

## Git Hooks

This project uses [Husky](https://typicode.github.io/husky/) for Git hooks:

- **pre-commit**: Runs `lint-staged` to lint and format staged `.ts` files

```bash
# Hooks are automatically installed when you run npm install
npm install
```

## Requirements

- Node.js >= 20

## License

ISC

## Maintainers

aaochoa
