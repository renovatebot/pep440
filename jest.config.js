const ci = !!process.env.CI;

/** @type {import('jest').Config} */
module.exports = {
  roots: ["<rootDir>/test"],
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["lib/**/*.js"],
  coverageProvider: "v8",
  coverageReporters: ci ? ["html", "json", "text"] : ["html", "text"],
};
