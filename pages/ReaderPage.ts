import { Page, Locator, expect } from '@playwright/test';
import { closePopups } from '../helpers/ui';

export class ReaderPage {
  readonly page: Page;

  readonly chapterButton: Locator;
  readonly heading: Locator;

  readonly chapterDrawer: Locator;

  constructor(page: Page) {
    this.page = page;

    this.chapterButton = page.getByTestId(
      'reader-header-chapters-drawer-button'
    );

    this.heading = page.locator('h1.px-chapter-text');

    this.chapterDrawer = page.locator('[data-testid="chapters-drawer"]');
  }

  async open(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });

    await closePopups(this.page);

    await this.waitForReaderReady();
  }

  async waitForReaderReady() {
    await expect(this.heading).toBeVisible({ timeout: 20000 });

    await expect(this.chapterButton).toBeVisible({ timeout: 20000 });
  }

  async openChapters() {
    await expect(this.chapterButton).toBeVisible({ timeout: 20000 });

    await this.chapterButton.click();

    await expect(this.chapterDrawer).toBeVisible({ timeout: 20000 });
  }

  async selectChapter(title: string) {
    const chapter = this.chapterDrawer.getByText(title, { exact: false });

    await expect(chapter).toBeVisible({ timeout: 20000 });

    await chapter.click();
  }

  getHeading() {
    return this.heading;
  }

  async expectChapter2(text: string | RegExp) {
    await expect(
      this.page.locator('h1.px-chapter-text', { hasText: text })
    ).toBeVisible({ timeout: 20000 });
  }
}