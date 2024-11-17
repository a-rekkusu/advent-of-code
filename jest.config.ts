module.exports = {
  rootDir: '.',
  verbose: true,
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: ['tests'],
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest'
  },
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
}
