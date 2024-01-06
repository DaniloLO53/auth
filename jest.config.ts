/**
 * For a detailed explanation regarding each configuration property, visit:
 */

import type { Config } from 'jest';

/** @type {import('ts-jest').JestConfigWithTsJest} */
const config: Config = {
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'node',
};

export default config;
