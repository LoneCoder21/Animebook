const reactRecommended = require("eslint-plugin-react/configs/recommended");
const globals = require("globals");
const eslint_prettier = require("eslint-config-prettier/prettier");
const ts = require("@typescript-eslint/eslint-plugin");
const tsparser = require("@typescript-eslint/parser");

module.exports = [
    {
        files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
        ...reactRecommended,
        languageOptions: {
            ...reactRecommended.languageOptions,
            globals: {},
            parser: tsparser,
            parserOptions: {
                sourceType: "module",
                ecmaFeatures: { modules: true },
                ecmaVersion: "latest"
            }
        },
        settings: {
            react: {
                version: "detect"
            }
        },
        plugins: {
            eslint_prettier,
            ts
        },
        rules: {
            ...ts.configs["eslint-recommended"].rules,
            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off"
        }
    },
    eslint_prettier
];
