import { test, expect } from '@playwright/test';
import { HomePage } from '../../../pages/HomePage';

test('homepage auth', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();

  await homePage.expectAuthorizedUI();

  await expect(
    page.getByText(/You Might Like|Вам може сподобатися/i)
  ).toBeVisible();
});