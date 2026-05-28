import { test } from '@playwright/test';
import { HomePage } from '../../../pages/HomePage';

test('homepage open', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();
  await homePage.expectHeaderUI();
});