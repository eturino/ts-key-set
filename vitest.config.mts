import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    coverage: {
      include: ["src/**/*.ts"],
      exclude: ["**/__tests__/**", "**/commitlint.config.js"],
      reporter: ["text", "lcov"],
    }
  },
});
