module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  snapshotResolver: './jest.config.snapshotResolver.js',
  roots: ['<rootDir>/src/']
};