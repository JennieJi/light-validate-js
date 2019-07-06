module.exports = {
    "extends": "eslint:recommended",
    "parser": "@typescript-eslint/parser",
    "plugins": ["@typescript-eslint"],
    "env": {
        "es6": true,
        "node": true,
        "mocha": true
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
