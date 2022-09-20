import { Page } from '@playwright/test';

import { SnuttPage } from '../utils/SnuttPage';

export class MainPage extends SnuttPage {
  constructor(page: Page) {
    super(page);
  }

  goto() {
    return super.goto('/main');
  }
}
