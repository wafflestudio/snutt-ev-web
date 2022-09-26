import { Page } from '@playwright/test';

import { SnuttPage } from '../utils/SnuttPage';

export class CreatePage extends SnuttPage {
  constructor(page: Page) {
    super(page);
  }

  visit(id = 2444) {
    const query = new URLSearchParams();
    query.set('id', `${id}`);
    return super.goto(`/create?${query}`);
  }
}
