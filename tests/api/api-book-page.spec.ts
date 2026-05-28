import { test, expect } from '@playwright/test';
import { ENV } from '../../config/env';

const BOOK_SLUG = 'alice-to-find-her-way-into-iEhIQSsL';

test.describe('Book Page API', () => {

  test('book page data returns correct book info', async ({ request }) => {

    const response = await request.get(
      `${ENV.API_URL}/pages/book/${BOOK_SLUG}`,
      {
        headers: {
          'Accept-Language': 'en',
        },
      }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.book.title).toBe('Alice to find her way into');

    expect(body.book.slug).toContain('alice-to-find-her-way-into');

    expect(body.book.lang).toBe('en');

    expect(body.author.name).toBeTruthy();

    expect(body.chapters.length).toBeGreaterThan(0);

    expect(body.chapters[0]).toHaveProperty('title');

    expect(body.tags.length).toBeGreaterThan(0);

    expect(body.tags[0]).toHaveProperty('name');
  });

});