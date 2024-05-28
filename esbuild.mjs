import * as esbuild from "esbuild"

esbuild.build({
  entryPoints: ["./src/**/*.ts"],
  outdir: "./dist",
  platform: "node",
  sourcemap: true,
}).catch(() => process.exit(1))
