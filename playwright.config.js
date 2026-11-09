import { defineConfig } from '@playwright/test';
import { apiConfig } from './config/env.js';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { resultsDir: 'allure-results' }],
  ],
  use: {
    baseURL: apiConfig.baseURL,
    extraHTTPHeaders: apiConfig.headers,
    actionTimeout: apiConfig.timeout,
    trace: 'retain-on-failure',
  },
  outputDir: 'test-results',
});
