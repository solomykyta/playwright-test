import { test, expect } from '@playwright/test';

test('seccsessful login', async ({ page }) => {
    await page.goto ('https://www.saucedemo.com/');

    await page.fill ('#user-name', 'standard_user' );
    await page.getByPlaceholder('Password').fill ('secret_sauce');

    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');

});