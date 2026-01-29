module.exports = {
   env: {
      commonjs: true,
      es2021: true,
      node: true,
      mocha: true,
   },
   extends: [
      'airbnb-base',
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:node/recommended',
      'prettier',
   ],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: './tsconfig.json',
   },
   plugins: ['prettier', 'node', 'no-floating-promise', '@typescript-eslint'],
   rules: {
      // Prettier integration
      'prettier/prettier': 'warn',

      // Code structure
      curly: ['error', 'all'],
      'no-floating-promise/no-floating-promise': 2,

      // Variable and parameter rules
      'no-param-reassign': ['error', { props: false }],
      'no-underscore-dangle': 'off',

      // Import/Export rules
      'import/prefer-default-export': 'off',
      'import/extensions': [
         'error',
         'ignorePackages',
         {
            ts: 'never',
            js: 'never',
         },
      ],

      // Class rules
      'lines-between-class-members': 'off',
      '@typescript-eslint/lines-between-class-members': 'off',
      'new-cap': 'off',

      // Node.js specific
      'node/no-unpublished-import': 'off',
      'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
      'node/no-missing-import': 'off',

      // TypeScript specific
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-non-null-assertion': 'off',
   },
   settings: {
      'import/resolver': {
         node: {
            extensions: ['.js', '.ts'],
         },
      },
   },
   overrides: [
      {
         // JavaScript files (scripts)
         files: ['scripts/**/*.js'],
         parser: 'espree',
         parserOptions: {
            ecmaVersion: 'latest',
         },
         rules: {
            '@typescript-eslint/no-var-requires': 'off',
         },
      },
      {
         // Test files use tsconfig.test.json
         files: ['test/**/*.ts'],
         parserOptions: {
            project: './tsconfig.test.json',
         },
         rules: {
            // Allow Chai assertion style (e.g., expect(x).to.be.true)
            'no-unused-expressions': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
         },
      },
   ],
};
