import { expect, test } from '@playwright/test';

import { getTestCookie } from '../utils/cookie';
import { withCookie } from '../utils/withCookiePage';
import { MainPage } from './_page';

test(
  '강의평 목록이 비어있을 경우',
  withCookie(
    // 강의평 목록이 비어있을 경우
    [getTestCookie('TEST_MAIN_EVALUATION_EXIST', 'false')],
    async ({ page }) => {
      // 페이지에 접속하면
      const main = new MainPage(page);
      await main.goto();

      // 고양이가 보여야 한다
      const cat = main.findByTestId('main-empty-review');
      await expect(cat).toHaveCount(1);

      // 강의평은 안 보여야 한다
      const ev = main.findByTestId('main-evaluation-card');
      await expect(ev).toHaveCount(0);
    },
  ),
);

test(
  '강의평 목록이 비어있지 않을 경우',
  withCookie(
    // 강의평 목록이 비어있지 않을 경우
    [getTestCookie('TEST_MAIN_EVALUATION_EXIST', 'true')],
    async ({ page }) => {
      // 페이지에 접속하면
      const main = new MainPage(page);
      await main.goto();

      // 고양이는 안 보여야 한다
      const cat = main.findByTestId('main-empty-review');
      await expect(cat).toHaveCount(0);

      // 강의평이 6개 보여야 한다
      const ev = main.findByTestId('main-evaluation-card');
      await expect(ev).toHaveCount(6);

      // 스크롤하면 세 개를 더 불러와 9개가 보여져야 한다
      await main.scrollToBottom();
      await expect(ev).toHaveCount(9);

      // 스크롤하면 세 개를 더 불러와 12개가 보여져야 한다
      await main.scrollToBottom();
      await expect(ev).toHaveCount(12);

      // 마지막 페이지에서 스크롤하면 더 불러오지 못하고 그대로 12개가 보여져야 한다
      await main.scrollToBottom();
      await expect(ev).toHaveCount(12);

      // 첫 번째 강의평의 교수명에 박재욱이 나타나야 한다
      const firstEv = ev.first();
      await expect(firstEv).toContainText('박재욱');

      // 첫 번째 강의평을 클릭하면 해당하는 페이지로 이동해야 한다
      await firstEv.locator('text=서양문명의 역사 1').click();
      await expect(main.getPage()).toHaveURL('/detail?id=353');
    },
  ),
);