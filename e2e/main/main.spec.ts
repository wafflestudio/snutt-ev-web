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

test('헤더바', async ({ page }) => {
  const main = new MainPage(page);
  await main.goto();

  const appBar = main.findByTestId('app-bar');
  await expect(appBar).toContainText('강의평');

  const searchIcon = main.findByTestId('main-search-icon');
  await searchIcon.click();
  await expect(main.getPage()).toHaveURL('/search/');
});

test('지난 학기 강의평', async () => {
  // TODO:
});

test('교양 강의평 둘러보기', async ({ page }) => {
  const main = new MainPage(page);
  await main.goto();

  const container = main.findByTestId('main-category-picker');
  await expect(container).toHaveCount(1);

  // TODO: 더 테스트해야됨
});

test('강의평 목록', async () => {
  // TODO:
});
