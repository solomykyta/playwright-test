// import { test, expect } from '@playwright/test';
// import { closePopups } from '../../../helpers/ui';
// import { ReaderPage } from '../../../pages/ReaderPage';

// const READER_URL =
//   '/en/reader/alice-to-find-her-way-into-iEhIQSsL/1-rabbit-say-to12-ziPgOhDj?navigatedFrom=book';

// test.describe('Reader', () => {
//   test('switch chapter and content updates', async ({ page }) => {
//     const reader = new ReaderPage(page);

//     await reader.open(READER_URL);

//     await closePopups(page);

//     await reader.waitForReaderReady();

//     await expect(reader.getHeading()).toContainText(
//       'Rabbit say to12',
//       { timeout: 20000 }
//     );

//     await reader.openChapters();

//     await reader.selectChapter('2. Cat seemed to');

//     await reader.expectChapter2(/Cat seemed to/i);
//   });
// });