import { test as setup } from '@playwright/test';


setup('auth', async ({ page }) => {
  await page.goto('/');

  // закрыть cookie banner
  await page.getByText('Прийняти все').locator('button').click();
  

  // язык (если есть)
  await page.getByText('Оберіть мову книг').locator('button').click();

  // // login
  // await page.getByRole('button', { name: 'Sign in' }).click();

  // // Google OAuth (реальный flow)
  // const popup = await page.waitForEvent('popup');
  // await popup.getByRole('button', { name: 'Google' }).click();

  // // ждём успешный редирект
  // await page.waitForURL('/');

  // await page.context().storageState({ path: 'auth.json' });
});










