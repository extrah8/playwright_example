import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import { EnvUtils } from './utils/env.utils';

dotenv.config();

try {
  EnvUtils.validateRequiredEnvVars();
} catch (error) {
  console.error((error as Error).message);
  process.exit(1);
}

const baseURL = EnvUtils.getBaseURL();

export default defineConfig({
  outputDir: 'test-results/',
  preserveOutput: 'failures-only',
  testDir: './tests',
  timeout: 60_000,
  fullyParallel: true,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report-ui' }],
    ['junit', { outputFile: 'junit-report-ui/report.xml' }],
    [
      'monocart-reporter',
      {
        name: 'RepMove E2E Test Report',
        outputFile: 'monocart-report-ui/index.html',
      },
    ],
  ],
  workers: process.env.CI ? 2 : 4,
  expect: {
    timeout: 10000,
  },
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
