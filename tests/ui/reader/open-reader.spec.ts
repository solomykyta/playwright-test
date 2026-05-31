import { test, expect } from '@playwright/test';
import { closePopups } from '../../../helpers/ui';
import { BookPage } from '../../../pages/BookPage';
import { ReaderPage } from '../../../pages/ReaderPage';

const BOOK_SLUG = '/en/books/alice-to-find-her-way-into-iEhIQSsL';
const READER_URL =
  '/en/reader/alice-to-find-her-way-into-iEhIQSsL/1-rabbit-say-to12-ziPgOhDj?navigatedFrom=book';

test.describe('Reader', () => {

  test('open reader and basic UI is visible', async ({ page }) => {
    const bookPage = new BookPage(page);
    const reader = new ReaderPage(page);

    await bookPage.open(BOOK_SLUG);
    await closePopups(page);

    await page.getByTestId('mobile-book-continue-reading-button').click();
    await reader.waitReady();

    await expect(page).toHaveURL(/reader/);

    await expect(reader.chapterButton).toBeVisible();
    await expect(reader.libraryButton).toBeVisible();

    await reader.expectHeadingNotEmpty();
  });

});