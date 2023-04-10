/// <reference types= "vitest" />
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    maxConcurrency: 1,
    globals: true,
    coverage: {
      reporter: ['json-summary', 'json', 'lcov'],
    },
    exclude: ['**/node_modules/**', 'web/**'],
  },
  plugins: [tsconfigPaths()],
})
