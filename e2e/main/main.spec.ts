import { SnuttPage } from '../utils/SnuttPage';
import { test, expect, Page } from '@playwright/test';

class MainPage extends SnuttPage {
  constructor(page: Page) {
    super(page);
  }

  goto() {
    return super.goto('/main');
  }
}

test('AppBar', async ({ page }) => {
  const main = new MainPage(page);
  await main.goto();

  const appBar = main.findByTestId('app-bar');
  await expect(appBar).toContainText('강의평');

  const searchIcon = main.findByTestId('main-search-icon');
  await searchIcon.click();
  await expect(main.getPage()).toHaveURL('/search/');
});

test('Recent', async ({ page }) => {
  new MainPage(page);
  // TODO: 지난 학기 강의평쪽 테스트코드 작성
});

test('Category Picker', async ({ page }) => {
  const main = new MainPage(page);
  await main.goto();

  const container = main.findByTestId('main-category-picker');
  await expect(container).toHaveCount(1);
});
