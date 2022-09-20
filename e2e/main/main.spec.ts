import { withCookie } from '../utils/withCookiePage';
import { getTestCookie } from '../utils/cookie';
import { SnuttPage } from '../utils/SnuttPage';
import { test, expect, Page } from '@playwright/test';

// TODO: https://playwright.dev/docs/test-fixtures 를 이용해서 코드 간소화 가능할지 확인

class MainPage extends SnuttPage {
  constructor(page: Page) {
    super(page);
  }

  goto() {
    return super.goto('/main');
  }
}

test(
  '헤더바가 잘 보여진다',
  withCookie(
    [getTestCookie('TEST_RECENT_LECTURES_EXIST', 'true')],
    async ({ page }) => {
      const main = new MainPage(page);
      await main.goto();

      const appBar = main.findByTestId('app-bar');
      await expect(appBar).toContainText('강의평');

      const searchIcon = main.findByTestId('main-search-icon');
      await searchIcon.click();
      await expect(main.getPage()).toHaveURL('/search/');
    },
  ),
);

test(
  '지난 학기에 들은 강의가 없을 경우 지난 학기 강의평 섹션이 보여지지 않는다',
  withCookie(
    [getTestCookie('TEST_RECENT_LECTURES_EXIST', 'false')],
    async ({ page }) => {
      const main = new MainPage(page);
      await main.goto();

      const recentSection = main.findByTestId('main-recent');
      await expect(recentSection).toHaveCount(0);
    },
  ),
);

test(
  '지난 학기에 들은 강의가 있을 경우 지난 학기 강의평 섹션이 정상적으로 보여진다',
  withCookie(
    [getTestCookie('TEST_RECENT_LECTURES_EXIST', 'true')],
    async ({ page }) => {
      const main = new MainPage(page);
      await main.goto();

      const recentSection = main.findByTestId('main-recent');
      await expect(recentSection).toHaveCount(1);

      await main
        .findByTestId('main-recent-lecture-card')
        .locator('text=생물학')
        .click();
      await expect(main.getPage()).toHaveURL('/detail/?id=2512');
    },
  ),
);

test(
  '교양 강의평 둘러보기',
  withCookie(
    [getTestCookie('TEST_RECENT_LECTURES_EXIST', 'true')],
    async ({ page }) => {
      const main = new MainPage(page);
      await main.goto();

      const container = main.findByTestId('main-category-picker');
      await expect(container).toHaveCount(1);

      /* 토글 기능 test */
      const toggleChip = main.findByTestId('main-category-toggle-chip');
      const recentChip = toggleChip.locator('text=최신');
      const recommendChip = toggleChip.locator('text=추천');
      const detailText = main.findByTestId('main-category-detail');

      await expect(recentChip).toHaveAttribute('aria-selected', `${true}`);
      await expect(recommendChip).toHaveAttribute('aria-selected', `${false}`);
      await expect(detailText).toHaveText('최근 등록된 강의평');

      await recentChip.click();
      await expect(recentChip).toHaveAttribute('aria-selected', `${true}`);
      await expect(recommendChip).toHaveAttribute('aria-selected', `${false}`);
      await expect(detailText).toHaveText('최근 등록된 강의평');

      await recommendChip.click();
      await expect(recommendChip).toHaveAttribute('aria-selected', `${true}`);
      await expect(recentChip).toHaveAttribute('aria-selected', `${false}`);
      await expect(detailText).toHaveText('학우들의 추천 강의');
    },
  ),
);

test('강의평 목록', async () => {
  // TODO:
});
