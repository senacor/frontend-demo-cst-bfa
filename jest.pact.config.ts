import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: [
    '<rootDir>/setup-jest.ts',
    '<rootDir>/src/setup-jest.ts',
    '<rootDir>/pacts/setup-jest.ts',
  ],
  testMatch: [
    '**/?(*.)+(pact)\.(spec)\.(ts)',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
  ],
  collectCoverage: false,
  globals: {
    stringifyContentPathRegex: true,
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'html',
  ],
  testEnvironmentOptions: {
    url: 'http://localhost:8080',
  },
};

export default config;
