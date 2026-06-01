import { Page } from '@playwright/test';

export async function closePopups(page: Page) {

  const langModal = page.getByTestId('languages-modal');
  const langCloseBtn = langModal.locator('button').first();

  try {
    if (await langModal.isVisible({ timeout: 1500 }).catch(() => false)) {
      await langCloseBtn.click({ timeout: 1500 }).catch(() => {});
    }
  } catch (e) {
  }

  const cookieBtn = page.locator('#silktide-banner .accept-all');

  try {
    if (await cookieBtn.isVisible({ timeout: 1500 }).catch(() => false)) {
      await cookieBtn.click({ timeout: 1500 }).catch(() => {});
    }
  } catch (e) {
  }
}