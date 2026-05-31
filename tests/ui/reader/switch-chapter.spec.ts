import { test, expect } from '@playwright/test';
import { closePopups } from '../../../helpers/ui';
import { ReaderPage } from '../../../pages/ReaderPage';

const READER_URL =
  '/en/reader/alice-to-find-her-way-into-iEhIQSsL/1-rabbit-say-to12-ziPgOhDj?navigatedFrom=book';

test.describe('Reader', () => {

  test('switch chapter and content updates', async ({ page }) => {
    const reader = new ReaderPage(page);

    await reader.open(READER_URL);
    await closePopups(page);
    await reader.waitReady();

    await reader.expectChapterTitle(/Rabbit say to12/i);

    await reader.openChapters();
    await reader.selectChapter('Cat seemed to');

    await reader.expectChapterTitle(/Cat seemed to/i);
  });

});