import { expect, Page, test } from '@playwright/test';

import { getTestCookie } from '../utils/cookie';
import { SnuttPage } from '../utils/SnuttPage';
import { withCookie } from '../utils/withCookiePage';

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

      await expectChipStatus('recent');

      await recommendChip.click();
      await expectChipStatus('recommend');

      await recentChip.click();
      await expectChipStatus('recent');

      async function expectChipStatus(status: 'recent' | 'recommend') {
        return Promise.all([
          expect(recentChip).toHaveAttribute(
            'aria-selected',
            `${status === 'recent'}`,
          ),
          expect(recommendChip).toHaveAttribute(
            'aria-selected',
            `${status === 'recommend'}`,
          ),
          expect(detailText).toHaveText(
            { recent: '최근 등록된 강의평', recommend: '학우들의 추천 강의' }[
              status
            ],
          ),
          expect(main.getPage()).toHaveURL(
            `/main/?tag=${{ recent: 1, recommend: 2 }[status]}`,
          ),
        ]);
      }
    },
  ),
);

test(
  '강의평 목록이 비어있을 경우',
  withCookie(
    [getTestCookie('TEST_MAIN_EVALUATION_EXIST', 'false')],
    async ({ page }) => {
      const main = new MainPage(page);
      await main.goto();

      const cat = main.findByTestId('main-empty-review');
      const ev = main.findByTestId('main-evaluation-card');
      await expect(cat).toHaveCount(1);
      await expect(ev).toHaveCount(0);
    },
  ),
);

test(
  '강의평 목록이 비어있지 않을 경우',
  withCookie(
    [getTestCookie('TEST_MAIN_EVALUATION_EXIST', 'true')],
    async ({ page }) => {
      const main = new MainPage(page);
      await main.goto();

      const cat = main.findByTestId('main-empty-review');
      const ev = main.findByTestId('main-evaluation-card');
      await expect(ev).toHaveCount(6);

      const firstEv = ev.first();
      await expect(cat).toHaveCount(0);
      await expect(firstEv).toContainText('박재욱');

      await main.scrollToBottom();
      await expect(ev).toHaveCount(9);
      await main.scrollToBottom();
      await expect(ev).toHaveCount(12);
      await main.scrollToBottom();
      await expect(ev).toHaveCount(12);

      await firstEv.locator('text=서양문명의 역사 1').click();
      await expect(main.getPage()).toHaveURL('/detail/?id=353');
    },
  ),
);
