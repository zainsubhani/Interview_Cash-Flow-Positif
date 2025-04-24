// Backend jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },
  clearMocks: true,
  // Fixes the "Jest encountered an unexpected token" error with import statements
  transformIgnorePatterns: ["node_modules/(?!(uuid)/)"],
  // Add setup file if needed for global test setup
  // setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
};

// Frontend jest.config.js
module.exports = {
  preset: "react-scripts",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  moduleNameMapper: {
    // Handle CSS imports in tests
    "\\.(css|scss)$": "<rootDir>/src/__mocks__/styleMock.js",
    // Handle image imports
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/src/__mocks__/fileMock.js",
  },
  // Transforms for ES modules
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  // Create mock files if needed
  // setupFiles: ['<rootDir>/src/__tests__/setup.js'],
  testMatch: ["**/__tests__/**/*.(test|spec).(ts|tsx|js|jsx)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/index.tsx",
    "!src/reportWebVitals.ts",
    "!src/serviceWorker.ts",
  ],
};

// Mock files for frontend testing
// src/__mocks__/styleMock.js
module.exports = {};

// src/__mocks__/fileMock.js
module.exports = "test-file-stub";
