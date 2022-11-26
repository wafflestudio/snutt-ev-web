import { Page } from '@playwright/test';

import { SnuttPage } from '../utils/SnuttPage';

export class VerifyPage extends SnuttPage {
  constructor(page: Page) {
    super(page);
  }

  goto() {
    return super.goto('/verify');
  }

  get(type: 'email-input' | 'header' | 'code-input' | 'request-code-button' | 'submit-button' | 'warning-text') {
    return super.findByTestId(`verify-${type}`);
  }
}
