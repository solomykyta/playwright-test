import { test, expect } from '@playwright/test';
import { closePopups } from '../../../helpers/ui';

test('logout works', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await closePopups(page);

  await page.getByTestId('mobile-menu-burger-button').click();
  await page.getByTestId('menu-drawer-logout-link').click();

  await expect(
    page.getByTestId('mobile-login-auth-button')
  ).toBeVisible();
});