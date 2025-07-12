import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-plugin-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['src/**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['server/**/*.ts', 'vite.config.ts'],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        sourceType: 'module',
      },
    },
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { prettier },
    rules: { 'prettier/prettier': ['error'] },
  },
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      'coverage',
      'public',
      'out',
      'tmp',
      'temp',
      '.cache',
      '.next',
      '.nuxt',
      '.vercel',
      '.output',
      'script',
    ],
  },
]);
