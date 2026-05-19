import { Page } from '@playwright/test';

export async function closePopups(page: Page) {

  for (let i = 0; i < 3; i++) {
    const langClose = page.getByTestId('languages-modal').locator('button').first();
    const cookieBtn = page.locator('#silktide-banner .accept-all');

    if (await langClose.isVisible().catch(() => false)) {
      await langClose.click();
      await page.waitForTimeout(500);
    }

    if (await cookieBtn.isVisible().catch(() => false)) {
      await cookieBtn.click();
      await page.waitForTimeout(500);
    }
  }
}