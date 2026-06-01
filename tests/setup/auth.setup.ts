import { test as setup, request, expect } from '@playwright/test';
import { ENV } from '../../config/env';
import fs from 'fs';
import path from 'path';

setup('Authenticate user via API and persist session', async ({ browser }) => {

  const context = await browser.newContext({
    httpCredentials: {
      username: ENV.BASIC_AUTH_USER,
      password: ENV.BASIC_AUTH_PASSWORD,
    },
  });

  const page = await context.newPage();
  const api = await request.newContext();

  const response = await setup.step('Login via API (social provider)', async () => {
    return api.post(`${ENV.API_URL}/v1/auth/social/login`, {
      data: {
        provider_name: 'google',
        provider_id: ENV.TEST_GOOGLE_PROVIDER_ID,
        email: ENV.TEST_GOOGLE_EMAIL,
      },
    });
  });

  await setup.step('Validate authentication response', async () => {
    expect(response.ok()).toBeTruthy();
  });

  const body = await response.json();
  const token = body.accessToken;

  await setup.step('Extract access token', async () => {
    expect(token).toBeTruthy();
  });

  const expiresAt = Date.now() + 365 * 24 * 60 * 60 * 1000;

  await setup.step('Create authenticated session via token redirect', async () => {
    const authUrl =
      `${ENV.WEB_URL}/en/auth/sign-in/token?token=${encodeURIComponent(token)}&expiresAt=${expiresAt}`;

    await page.goto(authUrl);
    await page.waitForLoadState('networkidle');
  });

  await setup.step('Persist storage state (authenticated session)', async () => {
    await context.addCookies([
      {
        name: 'language',
        value: 'en',
        domain: new URL(ENV.WEB_URL).hostname,
        path: '/',
      },
    ]);

    const storageFile = path.join(process.cwd(), 'storage/google.json');
    await fs.promises.mkdir(path.dirname(storageFile), { recursive: true });

    await context.storageState({ path: storageFile });
  });

  await api.dispose();
  await context.close();
});