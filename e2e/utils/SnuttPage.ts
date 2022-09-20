import { Page } from '@playwright/test';

export class SnuttPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  findByTestId(testId: string) {
    return this.page.locator(`[data-testid=${testId}]`);
  }

  goto(url: string) {
    return this.page.goto(url);
  }

  getPage() {
    return this.page;
  }

  scrollToBottom() {
    return this.page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight),
    );
  }
}
