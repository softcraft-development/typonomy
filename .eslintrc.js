// eslint-disable-next-line no-undef
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
  ],
  root: true,
  rules: {
    "func-names": ["error", "always"],
    "func-style": ["error", "declaration", { allowArrowFunctions: true }],
    "max-len": ["warn", { code: 120 }],
    "no-console": "warn",
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "quote-props": ["error", "as-needed"],
    quotes: ["error", "double"],
    "sort-keys": ["error", "asc", { caseSensitive: true, natural: false }]
  }
}