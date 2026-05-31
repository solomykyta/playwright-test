import { Page, Locator, expect } from '@playwright/test';

export class ReaderPage {
  readonly page: Page;

  readonly chapterButton: Locator;
  readonly libraryButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.chapterButton = page.getByTestId(
      'reader-header-chapters-drawer-button'
    );

    this.libraryButton = page.locator(
      '[data-testid="add-book-to-library-button"], [data-testid="remove-book-to-library-button"]'
    );
  }

  async open(url: string) {
    await this.page.goto(url);
  }

  async waitReady() {
    await this.page.waitForLoadState('networkidle');
  }

  async openChapters() {
    await this.chapterButton.click();
  }

  async selectChapter(title: string) {
    const chapter = this.page.locator(`text=${title}`).first();
    await expect(chapter).toBeVisible({ timeout: 10000 });
    await chapter.click();
  }

  async getFirstHeading() {
    return this.page.getByRole('heading').first();
  }

  async expectHeadingNotEmpty() {
    const heading = await this.getFirstHeading();
    await expect(heading).not.toHaveText('');
  }

  async expectChapterTitle(title: RegExp) {
    await expect(
      this.page.getByRole('heading', { name: title })
    ).toBeVisible();
  }
}