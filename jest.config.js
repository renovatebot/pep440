const ci = !!process.env.CI;

/** @type {import('jest').Config} */
module.exports = {
  roots: ['<rootDir>/test'],
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['lib/**/*.js'],
  // coverageProvider: 'v8', bugy on node v20.11.0 :-/
  coverageReporters: ci ? ['html', 'json', 'text'] : ['html', 'text'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
