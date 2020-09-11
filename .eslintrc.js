module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:jest/recommended',
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript'
    ],
    plugins: ['filenames'],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module' // Allows for the use of imports
    },
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        'import/no-default-export': 'error',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        'class-methods-use-this': 'warn',
        'filenames/match-regex': [2, '^[0-9a-z-.]+$', true]
    },
    env: {
        'jest/globals': true
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [['src/*', './src/']],
                extensions: ['.ts', '.js', '.json']
            }
        }
    }
};
