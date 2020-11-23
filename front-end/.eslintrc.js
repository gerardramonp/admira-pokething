module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["plugin:react/recommended", "airbnb"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react"],
    rules: {
        "no-debugger": 1,
        "linebreak-style": 0,
        "global-require": 0,
        "eslint linebreak-style": [0, "error", "windows"],
    },
};
