import { test, expect } from '@playwright/test';
import { closePopups } from '../../../helpers/ui';
import { UI_ROUTES } from '../../../config/routes';

test('library open for auth-user', async ({ page }) => {
  await page.goto(UI_ROUTES.LIBRARY);
  await page.waitForLoadState('networkidle');

  await closePopups(page);

  await expect(page).toHaveURL(/library/);

  await expect(
    page.getByRole('button', { name: /I am reading now/i })
  ).toBeVisible();
});