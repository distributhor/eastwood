module.exports = {
  automock: false,
  clearMocks: true,
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[t]s?(x)'],
  transform: { '^.+\\.tsx?$': 'ts-jest' }
}
