import { test, expect } from '@playwright/test';
import { closePopups } from '../../../helpers/ui';

test('homepage guest open', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await closePopups(page);

    await expect(page.getByTestId('mobile-login-auth-button')).toBeVisible();

    await expect(page.getByText(/Popular books/i)).toBeVisible();

    await expect(page.getByText(/What’s MyNovel\?|Хто такі MyNovel?l\?/i)).toBeVisible();
})