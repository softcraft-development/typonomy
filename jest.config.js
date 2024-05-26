// eslint-disable-next-line no-undef
module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^nullish/(.*)": "<rootDir>/src/nullish/$1",
  },
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
}
