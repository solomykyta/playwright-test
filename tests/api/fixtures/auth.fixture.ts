import { test as base, request, expect, APIRequestContext } from '@playwright/test';
import { API_ROUTES } from '../../../config/routes';
import { ENV } from '../../../config/env';

type Fixtures = {
  authToken: string;
  authedRequest: APIRequestContext;
};

export const test = base.extend<Fixtures>({
  authToken: async ({ request }, use) => {
    const response = await request.post(
      `${ENV.API_URL}${API_ROUTES.LOGIN}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          provider_name: 'google',
          provider_id: ENV.TEST_GOOGLE_PROVIDER_ID,
          email: ENV.TEST_GOOGLE_EMAIL,
        },
      }
    );

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body.accessToken).toBeTruthy();

    await use(body.accessToken);
  },

  authedRequest: async ({ authToken }, use) => {
    const api = await request.newContext({
      baseURL: ENV.API_URL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    await use(api);
  },
});

export { expect };