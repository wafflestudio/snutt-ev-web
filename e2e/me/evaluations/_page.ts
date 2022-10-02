import { Page } from '@playwright/test';

import { SnuttPage } from '../../utils/SnuttPage';

export class MyEvaluationsPage extends SnuttPage {
  constructor(page: Page) {
    super(page);
  }

  goto() {
    return super.goto('/me/evaluations');
  }
}
