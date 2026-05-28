import { Page, expect } from '@playwright/test';

export class BookPage {
  constructor(private page: Page) {}

  cover = () => this.page.getByTestId('mobile-book-image-cover');
  title = () => this.page.getByTestId('mobile-book-title');
  readButton = () => this.page.getByTestId('mobile-book-read-button');
  abstract = () => this.page.getByTestId('mobile-book-abstract');
  likeButton = () => this.page.getByTestId('book-like-button');

  async open(slug: string) {
    await this.page.goto(slug);
    await this.page.waitForLoadState('networkidle');
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