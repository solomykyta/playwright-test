import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://plbn.ovh/');
  await page.getByRole('button', { name: 'Accept all' }).click();
});