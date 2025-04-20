module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended'
    ],
    parserOptions: { project: './tsconfig.json' },
    plugins: ['react', '@typescript-eslint'],
    settings: { react: { version: 'detect' } },
    env: { browser: true, es6: true, node: true },
    ignorePatterns: ["src/**/__tests__/**"]
};