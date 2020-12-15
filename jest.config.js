"use strict";

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts", "src/**/*.js"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 20,
      lines: 20,
      statements: 20,
    },
  },
  testEnvironment: "node",
  preset: "ts-jest",
};
