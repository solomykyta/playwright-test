// import { test, expect } from '@playwright/test';
// import { ReaderPage } from '../../../pages/ReaderPage';

// const READER_URL =
//   '/en/reader/alice-to-find-her-way-into-iEhIQSsL/1-rabbit-say-to12-ziPgOhDj?navigatedFrom=book';

// test.describe('Reader', () => {
//   test('switch chapter and content updates', async ({ page }) => {
//     const reader = new ReaderPage(page);

//     await reader.open(READER_URL);

//     await reader.waitForContent();

//     await reader.openChapters();

//     await reader.selectChapter('2. Cat seemed to');

//     await expect(reader.getHeading()).toContainText(
//       /Cat seemed to/i,
//       { timeout: 30000 }
//     );
//   });
// });