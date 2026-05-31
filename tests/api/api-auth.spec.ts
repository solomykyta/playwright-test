import { test, expect } from '@playwright/test';
import { API_ROUTES } from '../../config/routes';
import { ENV } from '../../config/env';

const providers = [
  {
    name: 'google',
    providerId: ENV.TEST_GOOGLE_PROVIDER_ID,
    email: ENV.TEST_GOOGLE_EMAIL,
  },
  {
    name: 'apple',
    providerId: ENV.TEST_APPLE_PROVIDER_ID,
    email: ENV.TEST_APPLE_EMAIL,
  },
];

test.describe('auth API', () => {

  providers.forEach(({ name, providerId, email }) => {

    test(`${name} login returns access token`, async ({ request }) => {

      const response = await request.post(
        `${ENV.API_URL}${API_ROUTES.LOGIN}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            provider_name: name,
            provider_id: providerId,
            email,
          },
        }
      );

      expect(response.status()).toBe(200);

      const body = await response.json();

      expect(body.accessToken).toBeTruthy();
      expect(typeof body.accessToken).toBe('string');

      expect(body.tokenType).toBe('Bearer');
    });

  });

});