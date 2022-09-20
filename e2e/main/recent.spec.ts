import { expect, test } from '@playwright/test';

import { getTestCookie } from '../utils/cookie';
import { withCookie } from '../utils/withCookiePage';
import { MainPage } from './_page';

test(
  '지난 학기에 들은 강의가 없을 경우 지난 학기 강의평 섹션이 보여지지 않는다',
  withCookie(
    // 지난 학기에 들은 강의가 없을 경우
    [getTestCookie('TEST_RECENT_LECTURES_EXIST', 'false')],
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
  '지난 학기에 들은 강의가 있을 경우 지난 학기 강의평 섹션이 정상적으로 보여진다',
  withCookie(
    // 지난 학기에 들은 강의가 있을 경우
    [getTestCookie('TEST_RECENT_LECTURES_EXIST', 'true')],
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
      await expect(main.getPage()).toHaveURL('/detail/?id=2512');
    },
  ),
);
