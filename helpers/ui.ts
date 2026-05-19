import { Page } from '@playwright/test';

export async function closePopups(page: Page) {
  const langClose = page.getByTestId('languages-modal').locator('button').first();

  if (await langClose.isVisible().catch(() => false)) {
    await langClose.click();
  }

  const cookieBtn = page.getByRole('button', { name: 'Прийняти все' });

  if (await cookieBtn.isVisible().catch(() => false)) {
    await cookieBtn.click();
  }
}