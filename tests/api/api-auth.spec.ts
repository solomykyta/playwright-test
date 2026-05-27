import { test, expect } from '@playwright/test';
import { API_ROUTES } from '../../config/routes';
import { ENV } from '../../config/env';

test.describe('auth API', () => {

  test('google login returns access token', async ({ request }) => {
    const response = await request.post(`${ENV.API_URL}${API_ROUTES.LOGIN}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        provider_name: 'google',
        provider_id: ENV.TEST_GOOGLE_PROVIDER_ID,
        email: ENV.TEST_GOOGLE_EMAIL,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.accessToken).toBeTruthy();
    expect(typeof body.accessToken).toBe('string');
    expect(body.tokenType).toBe('Bearer');
  });


  test('apple login returns access token', async ({ request }) => {
    const response = await request.post(`${ENV.API_URL}${API_ROUTES.LOGIN}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        provider_name: 'apple',
        provider_id: ENV.TEST_APPLE_PROVIDER_ID,
        email: ENV.TEST_APPLE_EMAIL,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.accessToken).toBeTruthy();
    expect(typeof body.accessToken).toBe('string');
    expect(body.tokenType).toBe('Bearer');
  });

});