import { Page } from '@playwright/test';

import { SnuttPage } from '../utils/SnuttPage';

export class DetailPage extends SnuttPage {
  constructor(page: Page) {
    super(page);
  }

  visit(id = 353) {
    return super.goto(`/detail?id=${id}`);
  }
}
