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
npm run evaluate             # Evaluate large model against 1079 test cases
npm run evaluate -- --size small    # Evaluate a specific size; add -i for interactive mode
```

## Model Sizes

Three size variants are trained with different accuracy/speed trade-offs:

| Size   | maxFeatures | maxSamples | N-gram range | Output file                      |
| ------ | ----------- | ---------- | ------------ | -------------------------------- |
| small  | 1,000       | 5,000      | 2–4          | `language-model-small.min.json`  |
| medium | 3,000       | 10,000     | 2–5          | `language-model-medium.min.json` |
| large  | 5,000       | 15,000     | 2–5          | `language-model-large.min.json`  |

Models are saved as minified JSON only. The `build` script copies all `*.min.json` files from `models/` into `dist/models/`. Load a specific size with `getDetector('small' | 'medium' | 'large')`.

The `size` field is stored in the saved model JSON and typed as `ModelSize = 'small' | 'medium' | 'large'` in `src/types/index.ts`.

## Architecture

Detection uses a two-signal pipeline: **ML** (TF-IDF + Gaussian Naive Bayes) and **slang dictionary lookup**. Which signal wins depends on text length and confidence thresholds defined as constants at the top of `src/inference/detector.ts`.

```text
Input → TextNormalizer → TfidfVectorizer → NaiveBayesClassifier ─┐
                                                                   ├─ merge → DetectionResult
Input → SlangDictionaries (Set<string> per language) ─────────────┘
```

**Signal selection logic** (`src/inference/detector.ts`):

- Text ≤ 15 chars: slang-first; falls back to ML if slang confidence < 0.5
- Normalized text < 3 chars: slang only, confidence halved
- Longer text: ML primary; slang can _override_ ML if it scores ≥ 2 points with a 2+ point margin, or _combine_ with ML when ML confidence < 0.6

**Detection sources** returned in `DetectionResult.source`:

- `'ml'` — pure ML result
- `'slang'` — slang dictionary won
- `'slang-override'` — slang overrode a weak ML prediction
- `'combined'` — averaged when both signals fire at low/medium confidence

**Key source files:**

| File                                | Role                                                                                          |
| ----------------------------------- | --------------------------------------------------------------------------------------------- |
| `src/inference/detector.ts`         | `LanguageDetector` class + singleton `getDetector()`                                          |
| `src/inference/tfidf-vectorizer.ts` | Character n-gram TF-IDF; feature count determined by model size                               |
| `src/inference/naive-bayes.ts`      | Gaussian Naive Bayes classifier with `predict(vector, allowedLanguages?, fastMode?)`          |
| `src/utils/slang-dictionaries.ts`   | Aggregates per-language `Set<string>` from `*.data.js` files                                  |
| `src/utils/slang-*.data.js`         | Raw slang/abbreviation word lists per language (~4,600+ total terms)                          |
| `src/utils/text-normalizer.ts`      | `normalizeText` (strips URLs, emails, phone numbers, lowercases) + `augmentText` for training |
| `src/utils/ngram-extractor.ts`      | `extractNgrams`, `countNgrams`, `getTermFrequencies`                                          |
| `src/types/index.ts`                | All shared TypeScript interfaces and types including `ModelSize`                              |
| `scripts/train.js`                  | Batch training; `SIZE_CONFIGS` at the top defines all size parameters                         |

**Singleton pattern:** `getDetector(size?)` returns a cached `LanguageDetector` instance per size. Call `resetDetector()` between tests to avoid state leakage.

**`allowedLanguages` / `fastMode`:** When `setAllowedLanguages(['en', 'es'])` is called, `fastMode: false` (default) still runs all languages so "neither" detection works via low confidence. `fastMode: true` normalizes only over allowed languages — faster but no "neither" detection.

## Coding Rules

### Language and formatting

- **Source code** (`src/`) is TypeScript; **scripts** (`scripts/`) are plain CommonJS JavaScript.
- Formatting is enforced by Prettier (via ESLint): 4-space indent, single quotes, trailing commas, semicolons, 100-char print width. Run `npm run lint:fix` before committing — the pre-commit hook will do it anyway.
- Follow the Airbnb base style guide. Key consequences:
  - Use `forEach` / `map` / `reduce` over `for...of` loops.
  - Increment with `i += 1`, not `i++`.
  - Always use `curly` braces for control flow, even single-line.
  - No `console.log` in `src/` without `/* eslint-disable no-console */` at the top of the file.

### TypeScript conventions

- All shared types live in `src/types/index.ts`. Do not define types inline in source files — add them there and import.
- Private class fields use an `_` prefix (e.g. `_vectorizer`, `_fitted`). The `no-underscore-dangle` rule is disabled so this pattern is intentional.
- Avoid `any`. Use `unknown` with a type guard, or a concrete type. The linter will warn on `any`.
- Unused variables are errors. Prefix intentionally unused parameters with `_` (e.g. `_options`) to silence the rule.
- Do not use `!` non-null assertions unless the preceding logic makes `null` impossible and a comment explains why.

### Module structure

- `src/utils/` — pure functions only, no classes.
- `src/inference/` — stateful ML components as classes (`TfidfVectorizer`, `NaiveBayesClassifier`, `LanguageDetector`).
- `src/types/index.ts` — all interfaces and type aliases.
- `src/index.ts` — the only public surface. Every new export must be added here explicitly; nothing is re-exported automatically.

### Function design

- Prefer many small, named helper functions over large ones. See `src/inference/detector.ts` for the pattern: each logical step (`detectShortText`, `createSlangResult`, `shouldSlangOverride`, …) is its own function.
- Helper functions that are only used within one file stay in that file, above the class or main function that uses them.
- Do not create a helper for code that is only used once.

### Slang dictionaries

- Each language has its own data file: `src/utils/slang-{lang}.data.js` (plain JS, `module.exports = [...]`).
- `src/utils/slang-dictionaries.ts` aggregates them into `SLANG_WORDS: SlangDictionary` (`Record<string, Set<string>>`). Always use `Set` — never an array — for O(1) lookups.
- Add new words to the per-language `.data.js` file. Do not hard-code slang terms anywhere else.

### Training scripts

- Scripts live in `scripts/` and use `require('../dist')` — they depend on a production build. Run `npm run build` before running any script.
- Size configurations are the single source of truth in `SIZE_CONFIGS` at the top of `scripts/train.js`. To change training parameters for a size, edit that object only.
- Only minified model files (`language-model-{size}.min.json`) are committed to the repo. Never commit a pretty-printed model file.

### Testing

- Tests use Mocha + Chai with `describe`/`it` blocks, mirroring the `src/` directory structure under `test/`.
- Never load the real trained model in unit tests. Build a minimal in-memory model using `TfidfVectorizer.fitTransform` + `NaiveBayesClassifier.fit` with a handful of hardcoded sentences (see `test/inference/detector.test.ts` for the pattern).
- Call `resetDetector()` in `beforeEach` whenever a test touches the singleton.
- Test files for `src/inference/` go in `test/inference/`, utilities in `test/utils/`.

## Package Notes

- Published to npm as `naive-bayes-language-detector`; only `dist/` is included (see `files` in package.json)
- All three model sizes are bundled in `dist/models/` via `*.min.json` glob in the build script
- Husky pre-commit runs `lint-staged` (ESLint + Prettier) on staged `.ts` files in `src/` and `test/`
- ESLint uses Airbnb base config + Prettier; test config is `tsconfig.test.json`
