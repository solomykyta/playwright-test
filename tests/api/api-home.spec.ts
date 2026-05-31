import { test, expect } from '@playwright/test';
import { ENV } from '../../config/env';

test('GET tags - homepage genres (EN)', async ({ request }) => {
  const response = await request.get(
    `${process.env.API_URL}/v1/tags?page=1&perPage=100&search=&sortBy=popularity`,
    {
      headers: {
        'Accept-Language': 'en',
      },
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toHaveProperty('data');
  expect(Array.isArray(body.data)).toBeTruthy();

  const names = body.data.map((tag: any) => tag.name);

  expect(names).toEqual(
    expect.arrayContaining([
      'Romance',
      'Fantasy',
    ])
  );

  const invalidLang = body.data.find(
    (tag: any) => tag.lang !== 'en'
  );

  expect(invalidLang).toBeUndefined();

  expect(body.meta).toHaveProperty('total');
  expect(body.meta.total).toBeGreaterThan(0);
});



test('GET tags - Cyberpunk search (stable)', async ({ request }) => {
  const response = await request.get(
    `${process.env.API_URL}/v1/tags?isGenre=1&perPage=100&search=Cyberpunk`,
    {
      headers: {
        'Accept-Language': 'en',
      },
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(Array.isArray(body.data)).toBeTruthy();
  expect(body.data.length).toBeGreaterThan(0);

  const cyberpunk = body.data.find((tag: any) =>
    tag.name?.toLowerCase() === 'cyberpunk'
  );

  expect(cyberpunk).toBeDefined();

  expect(cyberpunk).toMatchObject({
    name: 'Cyberpunk',
    lang: 'en',
    isGenre: true,
  });

  expect(typeof cyberpunk.id).toBe('number');
  expect(typeof cyberpunk.slug).toBe('string');
});