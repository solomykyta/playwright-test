import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: 'https://plbn.ovh',
    storageState: 'storage/google.json',

    httpCredentials: {
      username: 'litdev',
      password: 'PTi8ey62tjy0Ue6',
    },

    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,

      use: {
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 2,
        isMobile: true,
      },
    },

    {
      name: 'chromium',
      dependencies: ['setup'],
    },
  ],
});