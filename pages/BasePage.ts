import { Page } from '@playwright/test';

export class BasePage {
  constructor(public page: Page) {}

  async waitForAppReady() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }
}