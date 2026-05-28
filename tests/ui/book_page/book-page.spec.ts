import { test } from '@playwright/test';
import { closePopups } from '../../../helpers/ui';
import { BookPage } from '../../../pages/BookPage';

const BOOK_SLUG = '/en/books/alice-to-find-her-way-into-iEhIQSsL';

test.describe('Book Page', () => {
  test('book page basic UI is visible', async ({ page }) => {
    const bookPage = new BookPage(page);

    await bookPage.open(BOOK_SLUG);
    await closePopups(page);

    await bookPage.expectBasicUI();
  });

  test('like button is visible and clickable', async ({ page }) => {
    const bookPage = new BookPage(page);

    await bookPage.open(BOOK_SLUG);
    await closePopups(page);

    await bookPage.likeBook();
  });
});