const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@layouts/(.*)$': '<rootDir>/src/layouts/$1',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@public/(.*)$': '<rootDir>/public/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
  coverageReporters: ['json-summary', 'lcov'],
  clearMocks: true,
}

module.exports = createJestConfig(customJestConfig)
