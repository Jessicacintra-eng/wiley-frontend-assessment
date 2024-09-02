import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  roots: ['<rootDir>/src'],
  collectCoverage: true, 
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', 
    '!src/**/*.d.ts',
  ],
  coverageReporters: ['json', 'html', 'text-summary'], 
  coverageDirectory: '<rootDir>/coverage',
};

export default config;
