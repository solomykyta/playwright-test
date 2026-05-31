import { test as setup, request, expect } from '@playwright/test';
import { ENV } from '../../config/env';

setup('auth setup', async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: {
      username: ENV.BASIC_AUTH_USER,
      password: ENV.BASIC_AUTH_PASSWORD,
    },
  });

  const page = await context.newPage();

  const api = await request.newContext();

  const response = await api.post(
    `${ENV.API_URL}/v1/auth/social/login`,
    {
      data: {
        provider_name: 'google',
        provider_id: ENV.TEST_GOOGLE_PROVIDER_ID,
        email: ENV.TEST_GOOGLE_EMAIL,
      },
    }
  );

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  const token = body.accessToken;

  expect(token).toBeTruthy();

  const expiresAt = Date.now() + 365 * 24 * 60 * 60 * 1000;

  const authUrl =
    `${ENV.WEB_URL}/en/auth/sign-in/token?token=${encodeURIComponent(token)}&expiresAt=${expiresAt}`;

  await page.goto(authUrl);

  await page.waitForLoadState('networkidle');

  await context.addCookies([
    {
      name: 'language',
      value: 'en',
      domain: new URL(ENV.WEB_URL).hostname,
      path: '/',
    },
  ]);

  await context.storageState({
    path: 'storage/google.json',
  });

  await api.dispose();
  await context.close();
});