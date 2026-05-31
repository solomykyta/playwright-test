import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class BookPage extends BasePage {
  cover = () => this.page.getByTestId('mobile-book-image-cover');
  title = () => this.page.getByTestId('mobile-book-title');
  readButton = () => this.page.getByTestId('mobile-book-read-button');
  abstract = () => this.page.getByTestId('mobile-book-abstract');
  likeButton = () => this.page.getByTestId('book-like-button');

  constructor(page: Page) {
    super(page);
  }

  async open(slug: string) {
    await this.page.goto(slug);
    await this.waitForAppReady(); // 👈 из BasePage
  }

  async expectBasicUI() {
    await expect(this.cover()).toBeVisible();
    await expect(this.title()).toBeVisible();
    await expect(this.readButton()).toBeVisible();
    await expect(this.abstract()).toBeVisible();
  }

  async likeBook() {
    await expect(this.likeButton()).toBeVisible();
    await this.likeButton().click();
  }
}