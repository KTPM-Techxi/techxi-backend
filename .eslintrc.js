module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: "eslint:recommended",
    overrides: [
        {
            env: {
                node: true
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script"
            }
        }
    ],
    parserOptions: {
        ecmaVersion: "latest"
    },
    rules: {
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "no-empty": ["off", { allowEmptyCatch: true }],
        "no-unused-vars": "off",
        "no-useless-catch": "off", // Ignore the "no-useless-catch" rule
    },
};