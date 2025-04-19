module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    plugins: ['react', '@typescript-eslint'],
    settings: { react: { version: 'detect' } },
    env: { browser: true, es6: true, node: true },
};