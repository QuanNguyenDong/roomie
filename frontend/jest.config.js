module.exports = {
    transform: {
      "^.+\\.[tj]sx?$": "babel-jest",  // Handles .js, .jsx, .ts, .tsx files
      "^.+\\.mjs$": "babel-jest",      // Handles .mjs files (for ES modules)
    },
    transformIgnorePatterns: [
      "node_modules/(?!(axios|gapi-script)/)",  // Transforms axios and gapi-script
    ],
    testTimeout: 10000,  // Optional: extend test timeout if necessary
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy',  // Mock CSS/SCSS files
    },
    testEnvironment: "jsdom",  // Simulate a browser-like environment
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],  // Optional setup files
  };
  