import { Page } from '@playwright/test';

import { SnuttPage } from '../utils/SnuttPage';

export class DetailPage extends SnuttPage {
  constructor(page: Page) {
    super(page);
  }

  visit(id = 353, query?: URLSearchParams) {
    const queryString = query ? `&${query}` : '';
    return super.goto(`/detail?id=${id}${queryString}`);
  }
}
