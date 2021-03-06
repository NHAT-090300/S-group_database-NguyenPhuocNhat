module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "airbnb-base"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
      "linebreak-style": 0,
      "indent": 0,
      "consistent-return": 0,
      "no-underscore-dangle": 0,
      "no-tabs": 0,
      "dot-notation": 0,
      "default-case": 0
    }
}