import { test, expect } from '@playwright/test';
import { closePopups } from '../../../helpers/ui';

test('homepage auth', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await closePopups(page);

    await expect(page.locator('a[href*="/library/shelf/reading"]:visible').first()).toBeVisible();
    
    await expect(page.getByRole('button', { name: 'Notifications' }).first()).toBeVisible();

    await expect(page.getByText(/You Might Like|Вам може сподобатися/i)).toBeVisible();
})