module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  snapshotResolver: './jest.config.snapshotResolver.js',
  roots: ['<rootDir>/src/']
}
