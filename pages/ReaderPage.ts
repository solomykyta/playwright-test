import { Page, Locator, expect } from '@playwright/test';
import { closePopups } from '../helpers/ui';

export class ReaderPage {
  readonly page: Page;

  readonly chapterButton: Locator;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;

    this.chapterButton = page.getByTestId(
      'reader-header-chapters-drawer-button'
    );

    this.heading = page.locator('h1.px-chapter-text');
  }

  async open(url: string) {
    await this.page.goto(url);

    await closePopups(this.page);

    await this.waitForReaderHydration();
  }

  async waitForReaderHydration() {
    await expect(this.chapterButton).toBeVisible({ timeout: 30000 });

  }

  async waitForContent() {
    await expect(this.heading).toBeVisible({ timeout: 30000 });
    await expect(this.heading).not.toHaveText('', { timeout: 30000 });
  }

  async openChapters() {
    await this.chapterButton.click();

    await expect(
      this.page.locator('body')
    ).toBeVisible();
  }

  async selectChapter(title: string) {
    const chapter = this.page.getByText(title, { exact: false });

    await expect(chapter.first()).toBeVisible({ timeout: 30000 });
    await chapter.first().click();

    await this.waitForContent();
  }

  getHeading() {
    return this.heading;
  }
}