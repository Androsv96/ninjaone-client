module.exports = {
  testEnvironment: "jest-environment-jsdom",
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "^.+\\.svg$": "<rootDir>/svgTransform.js",
  },
  testPathIgnorePatterns: ["<rootDir>/src/__tests__/test-utils.tsx"],
};
