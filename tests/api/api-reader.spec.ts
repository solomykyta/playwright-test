import { test, expect } from '@playwright/test';

const CHAPTER_ENDPOINT =
  '/books/alice-to-find-her-way-into-iEhIQSsL/chapters/1-rabbit-say-to12-ziPgOhDj';

test.describe('Reader API', () => {
  test('reader chapter content is returned correctly', async ({ request }) => {
    const response = await request.get(`${process.env.API_URL}${CHAPTER_ENDPOINT}`, {
      headers: {
        'Accept-Language': 'en',
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();


    expect(body.data).toBeTruthy();
    expect(body.data.status).toBe('ready');

    expect(body.data.text).toBeTruthy();
    expect(body.data.text.length).toBeGreaterThan(100);

    expect(body.data.text).toContain('<p');

    expect(body.data.text).toContain('Alice');

    expect(body.data.text).not.toContain('locked');
  });
});



// const RESTRICTED_CHAPTER_ENDPOINT =
//   '/books/mi-mi-cat-ppCKVNRg/chapters/prologue-ySi95OF2';

// test.describe('Reader API - age restriction', () => {
//   test('underage user cannot access 18+ chapter', async ({ request }) => {
//     const response = await request.get(
//       `${process.env.API_URL}${RESTRICTED_CHAPTER_ENDPOINT}`,
//       {
//         headers: {
//           'Accept-Language': 'en',
//            'x-app-type': 'web',
//         },
//       }
//     );

//     expect(response.status()).toBe(403);

//     const body = await response.json();

//     expect(body).toBeTruthy();
//   });
// });