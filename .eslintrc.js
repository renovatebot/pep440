/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "plugin:promise/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    camelcase: 0,
    "no-param-reassign": "warn",
    "require-await": "error",
    "no-use-before-define": 0,
    "no-restricted-syntax": 0,
    "no-await-in-loop": 0,
    "prefer-template": "off",
    "promise/always-return": "error",
    "promise/no-return-wrap": "error",
    "promise/param-names": "error",
    "promise/catch-or-return": "error",
    "promise/no-native": "off",
    "promise/no-nesting": "warn",
    "promise/no-promise-in-callback": "warn",
    "promise/no-callback-in-promise": "warn",
    "promise/avoid-new": "warn",
  },
  overrides: [
    {
      // files to check, so no `--ext` is required
      files: ["**/*.{js,mjs,cjs}"],
    },
  ],
};
