const reactRecommended = require("eslint-plugin-react/configs/recommended");
const globals = require("globals");
const eslint_prettier = require("eslint-config-prettier/prettier");

module.exports = [
    {
        files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
        ...reactRecommended,
        languageOptions: {
            ...reactRecommended.languageOptions,
            globals: {}
        },
        settings: {
            react: {
                version: "detect"
            }
        },
        plugins: {
            eslint_prettier
        },
        rules: {
            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off"
        }
    },
    eslint_prettier
];
