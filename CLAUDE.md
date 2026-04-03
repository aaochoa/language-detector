# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Build
npm run build          # Compiles TypeScript to dist/ and copies models/*.min.json to dist/models/

# Test
npm test               # Run all tests (Mocha + ts-node, 30s timeout)
npm run coverage       # Tests with lcov + text coverage report

# Single test file
TS_NODE_PROJECT=tsconfig.test.json npx mocha --require ts-node/register --timeout 30000 --exit 'test/inference/detector.test.ts'

# Lint
npm run lint           # ESLint on src/
npm run lint:fix       # ESLint with auto-fix + Prettier

# Training pipeline (run in order)
npm run download-data        # Download corpora from Tatoeba, OpenSubtitles, Leipzig, etc.
npm run prepare-data         # Filter, deduplicate, and write processed data
npm run train                # Train all three sizes
npm run train:small          # Train small model only
npm run train:medium         # Train medium model only
npm run train:large          # Train large model only
npm run evaluate             # Evaluate large model against 959 test cases
npm run evaluate -- --size small    # Evaluate a specific size; add -i for interactive mode
```

## Model Sizes

Three size variants are trained with different accuracy/speed trade-offs:

| Size   | maxFeatures | maxSamples | N-gram range | Output file |
|--------|-------------|------------|--------------|-------------|
| small  | 1,000       | 5,000      | 2–4          | `language-model-small.min.json` |
| medium | 3,000       | 10,000     | 2–5          | `language-model-medium.min.json` |
| large  | 5,000       | 15,000     | 2–5          | `language-model-large.min.json` |

Models are saved as minified JSON only. The `build` script copies all `*.min.json` files from `models/` into `dist/models/`. Load a specific size by passing the appropriate path to `getDetector()`.

The `size` field is stored in the saved model JSON and typed as `ModelSize = 'small' | 'medium' | 'large'` in `src/types/index.ts`.

## Architecture

Detection uses a two-signal pipeline: **ML** (TF-IDF + Gaussian Naive Bayes) and **slang dictionary lookup**. Which signal wins depends on text length and confidence thresholds defined as constants at the top of `src/inference/detector.ts`.

```
Input → TextNormalizer → TfidfVectorizer → NaiveBayesClassifier ─┐
                                                                   ├─ merge → DetectionResult
Input → SlangDictionaries (Set<string> per language) ─────────────┘
```

**Signal selection logic** (`src/inference/detector.ts`):
- Text ≤ 15 chars: slang-first; falls back to ML if slang confidence < 0.5
- Normalized text < 3 chars: slang only, confidence halved
- Longer text: ML primary; slang can *override* ML if it scores ≥ 2 points with a 2+ point margin, or *combine* with ML when ML confidence < 0.6

**Detection sources** returned in `DetectionResult.source`:
- `'ml'` — pure ML result
- `'slang'` — slang dictionary won
- `'slang-override'` — slang overrode a weak ML prediction
- `'combined'` — averaged when both signals fire at low/medium confidence

**Key source files:**
| File | Role |
|------|------|
| `src/inference/detector.ts` | `LanguageDetector` class + singleton `getDetector()` |
| `src/inference/tfidf-vectorizer.ts` | Character n-gram TF-IDF; feature count determined by model size |
| `src/inference/naive-bayes.ts` | Gaussian Naive Bayes classifier with `predict(vector, allowedLanguages?, fastMode?)` |
| `src/utils/slang-dictionaries.ts` | Aggregates per-language `Set<string>` from `*.data.js` files |
| `src/utils/slang-*.data.js` | Raw slang/abbreviation word lists per language (~4,600+ total terms) |
| `src/utils/text-normalizer.ts` | `normalizeText` (strips URLs, emails, phone numbers, lowercases) + `augmentText` for training |
| `src/utils/ngram-extractor.ts` | `extractNgrams`, `countNgrams`, `getTermFrequencies` |
| `src/types/index.ts` | All shared TypeScript interfaces and types including `ModelSize` |
| `scripts/train.js` | Batch training; `SIZE_CONFIGS` at the top defines all size parameters |

**Singleton pattern:** `getDetector(modelPath)` returns a cached `LanguageDetector` instance. Call `resetDetector()` between tests to avoid state leakage.

**`allowedLanguages` / `fastMode`:** When `setAllowedLanguages(['en', 'es'])` is called, `fastMode: false` (default) still runs all languages so "neither" detection works via low confidence. `fastMode: true` normalizes only over allowed languages — faster but no "neither" detection.

## Package Notes

- Published to npm as `naive-bayes-language-detector`; only `dist/` is included (see `files` in package.json)
- All three model sizes are bundled in `dist/models/` via `*.min.json` glob in the build script
- Husky pre-commit runs `lint-staged` (ESLint + Prettier) on staged `.ts` files in `src/` and `test/`
- ESLint uses Airbnb base config + Prettier; test config is `tsconfig.test.json`
