/// <reference types= "vitest" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    maxConcurrency: 1,
    environment: 'jsdom',
    globals: true,
    setupFiles: ['vitest.setup.js'],
    coverage: {
      reporter: ['json-summary', 'json', 'lcov'],
    },

    exclude: ['**/node_modules/**'],
  },
  plugins: [react(), tsconfigPaths()],
})
