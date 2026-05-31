import { defineConfig } from '@playwright/test';
import { ENV } from './config/env';
import path from 'path';

const storagePath = path.join(process.cwd(), 'storage/google.json');

export default defineConfig({
  testDir: './tests',

  fullyParallel: false,
  retries: 0,

  use: {
    baseURL: ENV.WEB_URL,

    httpCredentials: {
      username: ENV.BASIC_AUTH_USER,
      password: ENV.BASIC_AUTH_PASSWORD,
    },

    viewport: { width: 390, height: 844 },
    isMobile: true,
    locale: 'en-US',

    extraHTTPHeaders: {
      'x-app-type': 'mobile',
      'Accept-Language': 'en-US,en;q=0.9',
    },

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,

      use: {
        storageState: undefined,
      },
    },

    {
      name: 'chromium',
      dependencies: ['setup'],

      use: {
        storageState: storagePath,
      },
    },
  ],
});