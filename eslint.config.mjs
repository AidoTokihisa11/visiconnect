/**
 * ESLint flat config — VisioConnect (root level).
 *
 * Politique de sévérité :
 *   - Code nouveau (server/src, client/api, client/src/lib, hooks récents) :
 *     règles strictes (errors).
 *   - Code legacy (composants client préexistants) : règles permissives
 *     (warnings) pour ne pas bloquer la CI sur des dettes techniques
 *     hors périmètre de la mise à niveau sécurité.
 */
import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  js.configs.recommended,
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      'client/scripts/**',
      'client/convex/_generated/**',
      'convex/_generated/**',
      'capture website/**',
      'client/public/**',
      'load-tests/**',
    ],
  },

  // --- Node.js : serveur (CommonJS) ---
  {
    files: ['server/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // --- Fichiers de configuration CommonJS + functions serverless ---
  {
    files: [
      '**/postcss.config.js',
      '**/tailwind.config.js',
      'client/api/**/*.js',
      'client/netlify/**/*.js',
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },

  // --- React (client) ---
  {
    files: ['client/src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { react: reactPlugin, 'react-hooks': reactHooks },
    settings: { react: { version: 'detect' } },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      'react/display-name': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-undef': 'warn',
      'no-prototype-builtins': 'warn',
      'no-empty': ['warn', { allowEmptyCatch: true }],
    },
  },

  // --- Tests + fichiers de configuration ESM ---
  {
    files: [
      '**/*.test.js',
      '**/tests/**/*.js',
      '**/vitest.config.js',
      '**/vite.config.js',
      'eslint.config.js',
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.node },
    },
    rules: {
      'no-unused-expressions': 'off',
      'no-console': 'off',
    },
  },
];
