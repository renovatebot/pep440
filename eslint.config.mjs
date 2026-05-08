/* eslint-disable import-x/no-named-as-default-member */
import eslintContainerbase from '@containerbase/eslint-plugin';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import * as importX from 'eslint-plugin-import-x';
import pluginPromise from 'eslint-plugin-promise';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import vitest from '@vitest/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig(
  globalIgnores([
    '**/.git/',
    '**/.vscode',
    '**/node_modules/',
    '**/dist/',
    '**/coverage/',
    '**/__fixtures__/**/*',
    '**/__mocks__/**/*',
    '**/*.d.ts',
    '**/*.generated.ts',
    'tools/dist',
    'patches',
  ]),
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.{ts,js,mjs,cjs}'],
  })),
  ...tseslint.configs.stylisticTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.{ts,js,mjs,cjs}'],
  })),
  vitest.configs.recommended,
  pluginPromise.configs['flat/recommended'],
  eslintContainerbase.configs.all,
  eslintConfigPrettier,
  {
    files: ['**/*.{ts,js,mjs,cjs}'],
    extends: [importX.flatConfigs.recommended, importX.flatConfigs.typescript],

    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    settings: {
      'import-x/resolver-next': [createTypeScriptImportResolver()],
    },
  },
  {
    files: ['**/*.{ts,js,mjs,cjs}'],
    rules: {
      camelcase: 0,
      'no-param-reassign': 'warn',
      'require-await': 'error',
      'no-use-before-define': 0,
      'no-restricted-syntax': 0,
      'no-await-in-loop': 0,
      'prefer-template': 'off',
      'promise/always-return': 'error',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'promise/catch-or-return': 'error',
      'promise/no-native': 'off',
      'promise/no-nesting': 'warn',
      'promise/no-promise-in-callback': 'warn',
      'promise/no-callback-in-promise': 'warn',
      'promise/avoid-new': 'warn',

      // TODO: fixme
      '@typescript-eslint/no-require-imports': 0,
      '@typescript-eslint/no-unsafe-assignment': 0,
      '@typescript-eslint/no-unsafe-argument': 0,
      '@typescript-eslint/no-unsafe-call': 0,
      '@typescript-eslint/no-unsafe-member-access': 0,
      '@typescript-eslint/no-unsafe-return': 0,
      '@typescript-eslint/prefer-nullish-coalescing': 0,
      '@typescript-eslint/prefer-optional-chain': 0,
      '@typescript-eslint/restrict-template-expressions': 0,
    },
  },
  {
    files: ['test/**/*.{ts,js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.vitest,
      },
    },
    rules: {
      'prefer-destructuring': 0,
      'prefer-promise-reject-errors': 0,
      'import-x/no-extraneous-dependencies': 0,
      'global-require': 0,
    },
  },
);
