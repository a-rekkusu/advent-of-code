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
  }
}
