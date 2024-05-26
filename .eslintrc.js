module.exports = {
  extends: [
    "plugin:@stylistic/recommended-extends",
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@stylistic",
  ],
  root: true,
  rules: {
    "@stylistic/max-len": ["warn", { code: 120 }],
    "@stylistic/no-multiple-empty-lines": ["error", { max: 1 }],
    "@stylistic/quote-props": ["error", "as-needed"],
    "@stylistic/quotes": ["error", "double"],
    "func-names": ["error", "always"],
    "func-style": ["error", "declaration", { allowArrowFunctions: true }],
    "no-console": "warn",
    "sort-keys": ["error", "asc", { caseSensitive: true, natural: false }],
  },
}
