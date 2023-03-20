import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: [
    '<rootDir>/setup-jest.ts',
    '<rootDir>/src/setup-jest.ts',
  ],
  globalSetup: 'jest-preset-angular/global-setup',
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
    '!(**/?(*.)+(pact)\.(spec)\.(ts))',
    '!(**/?(*.)+(sub-pact)\.(spec)\.(ts))',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
  ],
  coverageReporters: [
    'clover',
    'json',
    'lcov',
    'text',
    'text-summary',
  ],
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '<rootDir>/src/assets/',
  ],
  reporters: [
    'default',
  ],
  globals: {},
};

export default config;
