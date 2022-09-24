import { expect, test } from '@playwright/test';

import { getTestCookie } from '../utils/cookie';
import { withCookie } from '../utils/withCookiePage';
import { MainPage } from './_page';

const TEST_RECENT_LECTURES_EXIST = 'TEST_RECENT_LECTURES_EXIST';

test(
  '지난 학기에 들은 강의가 없을 경우 지난 학기 강의평 섹션이 보여지지 않는다',
  withCookie(
    // 지난 학기에 들은 강의가 없을 경우
    [getTestCookie(TEST_RECENT_LECTURES_EXIST, 'false')],
    async ({ page }) => {
      // 페이지에 접속하면
      const main = new MainPage(page);
      await main.goto();

      // 지난 학기 강의 섹션이 보이지 않아야 한다
      const recentSection = main.findByTestId('main-recent');
      await expect(recentSection).toHaveCount(0);
    },
  ),
);

test(
  '지난 학기에 들은 강의가 있을 경우 더보기 버튼이 정상 동작한다',
  withCookie(
    // 지난 학기에 들은 강의가 있을 경우
    [getTestCookie(TEST_RECENT_LECTURES_EXIST, 'true')],
    async ({ page }) => {
      // 페이지에 접속하면
      const main = new MainPage(page);
      await main.goto();

      // 더보기를 클릭하면 지난 학기 강의 목록 링크로 이동해야 한다
      await main.findByTestId('main-recent-more-link').click();
      await expect(main.getPage()).toHaveURL('/recent');
    },
  ),
);

test(
  '지난 학기에 들은 강의가 있을 경우 강의평의 작성 버튼이 정상 동작한다',
  withCookie(
    // 지난 학기에 들은 강의가 있을 경우
    [getTestCookie(TEST_RECENT_LECTURES_EXIST, 'true')],
    async ({ page }) => {
      // 페이지에 접속하면
      const main = new MainPage(page);
      await main.goto();

      // 지난 학기 강의를 클릭하면 해당 강의 링크로 이동해야 한다
      await main
        .findByTestId('main-recent-lecture-card')
        .filter({ hasText: '생물학' })
        .locator('[data-testid=main-recent-lecture-write-button]')
        .click();
      await expect(main.getPage()).toHaveURL('/create?id=2512');
    },
  ),
);

test(
  '지난 학기에 들은 강의가 있을 경우 지난 학기 강의평 섹션이 정상적으로 보여진다',
  withCookie(
    // 지난 학기에 들은 강의가 있을 경우
    [getTestCookie(TEST_RECENT_LECTURES_EXIST, 'true')],
    async ({ page }) => {
      // 페이지에 접속하면
      const main = new MainPage(page);
      await main.goto();

      // 지난 학기 강의 섹션이 보여야 한다
      const recentSection = main.findByTestId('main-recent');
      await expect(recentSection).toHaveCount(1);

      // 지난 학기 강의를 클릭하면 해당 강의 링크로 이동해야 한다
      await main
        .findByTestId('main-recent-lecture-card')
        .locator('text=생물학')
        .click();
      await expect(main.getPage()).toHaveURL('/detail?id=2512');
    },
  ),
);
