import { test as setup, request, expect } from '@playwright/test';

const APP_URL = 'https://plbn.ovh';
const API_URL = 'https://api.plbn.ovh/v1';

setup('auth setup', async ({ browser }) => {
  // 🔥 1. создаём context С BASIC AUTH
  const context = await browser.newContext({
    httpCredentials: {
      username: 'litdev',
      password: 'PTi8ey62tjy0Ue6',
    },
  });

  const page = await context.newPage();

  // 2. API client (отдельно)
  const api = await request.newContext({
    extraHTTPHeaders: {
      Accept: 'application/json',
    },
  });

  const response = await api.post(`${API_URL}/auth/social/login`, {
    data: {
      provider_name: 'google',
      provider_id: '115296032587177509456',
      email: 'ewre3243ut@gmail.com',
    },
  });

  const body = await response.json();
  const token = body.accessToken;

  expect(token).toBeTruthy();

  // 3. фронтовый login URL
  const expiresAt = Date.now() + 365 * 24 * 60 * 60 * 1000;

  const authUrl =
    `${APP_URL}/en/auth/sign-in/token?token=${encodeURIComponent(token)}&expiresAt=${expiresAt}`;

  await page.goto(authUrl);

  // 4. ждём что страница реально загрузилась
  await page.waitForURL('**/');

  // 5. сохраняем state ИМЕННО из этого context
  await context.storageState({
    path: 'storage/google.json',
  });

  await context.close();
});