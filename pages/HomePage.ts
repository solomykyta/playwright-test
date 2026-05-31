import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { closePopups } from '../helpers/ui';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  headerLogo = () =>
    this.page.locator('header [data-testid="logo-link-element"]');

  searchButton = () =>
    this.page.getByTestId('mobile-search-modal-button');

  burgerMenuButton = () =>
    this.page.getByTestId('mobile-menu-burger-button');

  languageButton = () =>
    this.page.getByRole('button', {
      name: /English|Українська|Español|Tiếng Việt|Português/,
    });

  bookshelfLink = () =>
    this.page.locator('a[href*="/library/shelf/reading"]:visible').first();

  notificationsButton = () =>
    this.page.getByRole('button', { name: 'Notifications' }).first();

  loginButton = () =>
    this.page.getByTestId('mobile-login-auth-button');

  async open() {
    await this.page.goto('/');
    await this.waitForAppReady(); // 👈 теперь через BasePage
    await closePopups(this.page);
  }

  async expectGuestUI() {
    await expect(this.loginButton()).toBeVisible();
    await expect(this.page.getByText(/Popular books/i)).toBeVisible();
  }

  async expectAuthorizedUI() {
    await expect(this.bookshelfLink()).toBeVisible();
    await expect(this.notificationsButton()).toBeVisible();
  }

  async expectHeaderUI() {
    await expect(this.headerLogo()).toBeVisible();
    await expect(this.searchButton()).toBeVisible();
    await expect(this.burgerMenuButton()).toBeVisible();
    await expect(this.languageButton()).toBeVisible();
  }
}