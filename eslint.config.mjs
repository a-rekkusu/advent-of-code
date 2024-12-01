import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('@types/eslint').Linter.Config[]} */
export default tseslint.config(
    {
        ignores: ['dist', 'cjs', 'coverage', 'node_modules', 'eslint.config.mjs']
    },
    tseslint.configs.stylisticTypeChecked,
    {
        extends: tseslint.configs.stylisticTypeChecked,
        languageOptions: {
            sourceType: 'commonjs',
            parserOptions: {
                project: 'tsconfig.json',
                tsconfigRootDir: import.meta.dirname,
            }
        },
        rules: {
            'semi': ['error', 'never'],
            'comma-dangle': ['error', 'never'],
            'quotes': ['error', 'single'],
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { 'vars': 'all', 'varsIgnorePattern': '^_', 'args': 'after-used', 'argsIgnorePattern': '^_' }
            ],
            'no-unused-vars': 'off'
        }
    },
    {
        files: ['tests/**/*.test.ts'],
        languageOptions: {
            globals: {
                ...globals.jest,
                ...globals.commonjs,
            }
        }
    }
);