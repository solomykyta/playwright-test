import { test, expect } from '@playwright/test';
import { closePopups } from '../../../helpers/ui';

test('session stable after reload', async ({ page }) => {
  await page.goto('/');
  await closePopups(page);

    await expect(
    page.getByRole('button', { name: 'Notifications' }).first()
  ).toBeVisible();

  await page.reload();
  await page.waitForLoadState('networkidle');
  await closePopups(page);

  await expect(
    page.getByRole('button', { name: 'Notifications' }).first()
  ).toBeVisible();
});