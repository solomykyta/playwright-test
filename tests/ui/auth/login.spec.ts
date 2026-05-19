import { test, expect } from '@playwright/test';
import { closePopups } from '../../../helpers/ui';

test('login smoke', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await closePopups(page);

  await expect(
    page.getByRole('button', { name: 'Notifications' }).first()
  ).toBeVisible();
});