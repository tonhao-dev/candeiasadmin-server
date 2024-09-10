import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-unused-expressions': 'off',
      'react/require-default-props': 'off',

      'react/jsx-filename-extension': [
        'warn',
        {
          extensions: ['.jsx', '.js', '.ts', '.tsx'],
        },
      ],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'import/prefer-default-export': 'off',
      'import/order': 'off',
      'react/state-in-constructor': 'off',
      'react/static-property-placement': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/prop-types': 'off',
      'no-param-reassign': 'off',
      'no-console': 'off',
      'no-use-before-define': 'off',
      'global-require': 0,
      'no-shadow': 'off',
      'prettier/prettier': ['warn', { printWidth: 100, endOfLine: 'auto' }],
      'consistent-return': 'off',
      'default-case': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': ['off'],
      'explicit-module-boundary-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': ['off'],
      'ban-types': 'off',
      '@typescript-eslint/ban-types': ['off'],
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'no-underscore-dangle': 'off',
      'react/jsx-no-bind': 'off',
    },
    overrides: [
      {
        "files": ["tests/**/*"],
        "env": {
          "jest": true
        }
      }
    ]
  },
];
