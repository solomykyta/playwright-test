import { test, expect } from '@playwright/test';
import { closePopups } from '../../../helpers/ui';

test('homepage open', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await closePopups(page);
 
    const headerLogo = page.locator('header [data-testid="logo-link-element"]');
    await expect(headerLogo).toBeVisible();
    
    await expect(page.getByTestId('mobile-search-modal-button')).toBeVisible();

    await expect(page.getByTestId('mobile-menu-burger-button')).toBeVisible();

    await expect(page.getByRole('button', {name: /English|Українська|Español|Tiếng Việt|Português/})).toBeVisible();
});