// import { test, expect } from '@playwright/test';
// import { closePopups } from '../../../helpers/ui';
// import { BookPage } from '../../../pages/BookPage';

// const BOOK_SLUG =
//   '/en/books/alice-to-find-her-way-into-iEhIQSsL';

// test.describe('Reader', () => {
//   test('open reader and basic UI is visible', async ({ page }) => {
//     const bookPage = new BookPage(page);

//     await bookPage.open(BOOK_SLUG);

//     await closePopups(page);

//     const startButton = page.locator(
//       '[data-testid="mobile-book-continue-reading-button"], [data-testid="mobile-book-read-button"]'
//     );

//     await expect(startButton).toHaveCount(1, { timeout: 20000 });

//     await startButton.click();

//     await page.waitForURL(/reader/, { timeout: 20000 });

//     await expect(page).toHaveURL(/reader/);
//   });
// });
