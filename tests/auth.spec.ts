import { test, expect } from '@playwright/test';
import { closePopups } from '../helpers/ui';

test('login smoke', async ({ page }) => {
  await page.goto('/');

  await closePopups(page);

  await expect(page.getByLabel('Notifications')).toBeVisible();
});







// test('protected route - library access', async ({ page }) => {
//   await page.goto('/library');

//   await expect(page).toHaveURL(/library/);
//   await expect(page.getByTestId('library-page')).toBeVisible();
// });



// test('session persists after reload', async ({ page }) => {
//   await page.goto('/');

//   await page.reload();

//   await expect(
//     page.getByTestId('user-avatar')
//   ).toBeVisible();
// });



// test('logout works', async ({ page }) => {
//   await page.goto('/');

//   await page.getByTestId('user-menu').click();
//   await page.getByText('Logout').click();

//   await expect(
//     page.getByTestId('mobile-login-auth-button')
//   ).toBeVisible();
// });