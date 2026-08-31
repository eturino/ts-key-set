import { defineConfig } from "vite";

export default defineConfig({
  build: {
    ssr: "src/main.ts",
    outDir: "dist",
    target: "node20",
    minify: false,
  },
});
