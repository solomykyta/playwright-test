import { test, expect } from './fixtures/auth.fixture';
import { API_ROUTES } from '../../config/routes';

test('create subscription order returns valid order data', async ({ authedRequest }) => {
  const response = await authedRequest.post(API_ROUTES.SUBSCRIPTION_ORDER, {
    headers: {
      'X-App-Type': 'web',
    },
    data: {
      paymentButtonId: 2,
      planId: 6,
      failureUrl:
        'https://plbn.ovh/en/order/failure?productId=&productSlug=&productTitle=&productSubtitle=&productImageSrc=&subscriptionId=6&from=https%3A%2F%2Fplbn.ovh%2F',
      pendingUrl:
        'https://plbn.ovh/en/order/pending?productId=&productSlug=&productTitle=&productSubtitle=&productImageSrc=&subscriptionId=6&from=https%3A%2F%2Fplbn.ovh%2F',
      successUrl:
        'https://plbn.ovh/en/order/success?productId=&productSlug=&productTitle=&productSubtitle=&productImageSrc=&subscriptionId=6&from=https%3A%2F%2Fplbn.ovh%2F',
    },
  });

  expect(response.status()).toBe(201);

  const body = await response.json();

  expect(body?.data?.orderId).toBeTruthy();
  expect(typeof body.data.orderId).toBe('string');

  expect(body?.data?.paymentUrl).toContain('http');
});