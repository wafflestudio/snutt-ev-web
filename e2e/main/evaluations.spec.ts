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

      const cat = main.findByTestId('main-empty-review');
      const ev = main.findByTestId('main-evaluation-card');
      const firstEv = ev.first();

      // 고양이는 안 보여야 한다
      await expect(cat).toHaveCount(0);

      // 첫 번째 강의평의 교수명이 잘 나타나야 한다
      await expect(firstEv).toContainText('박재욱');

      // 첫 번째 강의평을 클릭하면 해당하는 페이지로 이동해야 한다
      await firstEv.locator('text=서양문명의 역사 1').click();
      await expect(main.getPage()).toHaveURL('/detail?id=353');
    },
  ),
);

test(
  '좋아요 기능이 정상 동작한다',
  withCookie(
    // 강의평 목록이 비어있지 않을 경우
    [getTestCookie('TEST_MAIN_EVALUATION_EXIST', 'true')],
    async ({ page }) => {
      // 페이지에 접속하면
      const main = new MainPage(page);
      await main.goto();

      const ev = main.findByTestId('main-evaluation-card');
      const firstEv = ev.first();
      const secondEv = ev.nth(1);

      // 첫 번째 강의평에 좋아요 개수가 2개로 나타나야 한다
      await expect(firstEv.locator('[data-testid=like-button-count]')).toHaveText('2');

      // 좋아요 여부가 잘 나타나야 한다
      await expect(firstEv.locator('[data-testid=like-button]')).toHaveAttribute('aria-checked', 'true');
      await expect(secondEv.locator('[data-testid=like-button]')).toHaveAttribute('aria-checked', 'false');

      // 좋아요 기능이 잘 동작해야 한다 (취소)
      await Promise.all([
        page.waitForRequest((req) => req.method() === 'DELETE'),
        page.waitForResponse((res) => res.url().includes(`/v1/evaluations/6260/likes`)),
        page.waitForRequest((req) => req.method() === 'GET' && req.url().includes(`/v1/tags/main/1/evaluations`)),
        firstEv.locator('[data-testid=like-button]').click(),
      ]);

      // 좋아요 기능이 잘 동작해야 한다 (좋아요)
      await Promise.all([
        page.waitForRequest((req) => req.method() === 'POST'),
        page.waitForResponse((res) => res.url().includes(`/v1/evaluations/6257/likes`)),
        page.waitForRequest((req) => req.method() === 'GET' && req.url().includes(`/v1/tags/main/1/evaluations`)),
        secondEv.locator('[data-testid=like-button]').click(),
      ]);
    },
  ),
);

test(
  '강의평 목록이 비어있지 않을 경우 더보기/접기 버튼이 정상 동작한다',
  withCookie(
    // 강의평 목록이 비어있지 않을 경우
    [getTestCookie('TEST_MAIN_EVALUATION_EXIST', 'true')],
    async ({ page }) => {
      // 페이지에 접속하면
      const main = new MainPage(page);
      await main.goto();

      const firstEv = main.findByTestId('main-evaluation-card').first();

      // 첫 번째 강의평에 대해 더보기/접기 버튼이 정상 동작한다
      const contentDataSelector = `[data-testid=collapsable-text-content]`;
      const moreLessBtnSelector = '[data-testid=collapsable-text-moreless-btn]';
      const firstEvContent = firstEv.locator(contentDataSelector);
      const firstEvMoreLessBtn = firstEv.locator(moreLessBtnSelector);
      await expect(firstEvMoreLessBtn).toContainText('더보기');
      await expect(firstEvContent).not.toContainText('LAST_TEST_TEXT');
      await firstEvMoreLessBtn.click();
      await expect(firstEvMoreLessBtn).toContainText('접기');
      await expect(firstEvContent).toContainText('LAST_TEST_TEXT');
    },
  ),
);

test(
  '내 강의평 보기 버튼이 정상 동작한다',
  withCookie([], async ({ page }) => {
    // 페이지에 접속하면
    const main = new MainPage(page);
    await main.goto();

    const myLink = main.findByTestId('main-my-evaluations-link');
    await myLink.click();
    await expect(main.getPage()).toHaveURL('/me/evaluations');
  }),
);
