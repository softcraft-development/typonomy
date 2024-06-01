import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        ".eslintrc.cjs",
        "esbuild.mjs",
        "src/index.ts",
      ],
      provider: "v8",
    },
  },
})
