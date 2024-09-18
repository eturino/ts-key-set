// eslint.config.cjs

const { FlatCompat } = require('@eslint/eslintrc'); // Import the compatibility helper
const typescriptParser = require('@typescript-eslint/parser');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const importPlugin = require('eslint-plugin-import');

// In CommonJS modules, __dirname is available directly
const compat = new FlatCompat({
  baseDirectory: __dirname, // __dirname is available in CommonJS
});

module.exports = [
  // Use the compatibility layer to include configurations from plugins
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier'
  ),
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      import: importPlugin,
    },
    settings: {
      'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '.d.tsx'],
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts', '.d.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      // Custom rules (applied after the extended configurations)
      'no-console': 'off', // We use console
      '@typescript-eslint/no-explicit-any': 'off', // We use `any` sometimes
      '@typescript-eslint/no-empty-function': 'off',
      'no-unused-vars': 'off', // Using the TypeScript version
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
      'no-return-await': 'error',
      'import/no-cycle': 'off',  // we need to disable this until we can solve the issue with generated in api using Context type...
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off', // Disable this rule
      'import/no-named-as-default': 'off',
      'import/default': 'off',
      'import/named': 'off',
      'import/no-named-as-default-member': 'off',
      '@typescript-eslint/naming-convention': 'off',
    },
  },
  {
    // Overrides for test files
    files: ['*.spec.ts', '**/__tests__/*', 'node_modules/**'],
    rules: {
      'import/namespace': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
];
