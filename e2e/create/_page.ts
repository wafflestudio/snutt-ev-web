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

  get(
    key:
      | `header-${'lecture-name' | 'lecture-detail' | 'semester-button' | 'semester-list' | 'semester-listitem'}`
      | 'cta-button'
      | `rating-${'star'}`
      | `score-${'slider-top' | 'slider-left' | 'slider-bottom' | 'slider-right'}`
      | `content-${'input'}`,
  ) {
    return super.findByTestId(`create-${key}`);
  }
}
