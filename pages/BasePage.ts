import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async waitForAppReady() {
    await this.page.waitForLoadState('domcontentloaded');
  }
}