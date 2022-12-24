import { expect, test } from '@playwright/test';

import { getTestCookie } from '../utils/cookie';
import { withCookie } from '../utils/withCookiePage';
import { DetailPage } from './_page';

const TEST_DETAIL_EVALUATION_EXIST = 'TEST_DETAIL_EVALUATION_EXIST';
const TEST_DETAIL_MY_EVALUATION_EXIST = 'TEST_DETAIL_MY_EVALUATION_EXIST';

test(
  '강의평 아이템이 정상 동작한다',
  withCookie(
    // 강의평 목록이 둘 다 있을 경우
    [getTestCookie(TEST_DETAIL_EVALUATION_EXIST, 'true'), getTestCookie(TEST_DETAIL_MY_EVALUATION_EXIST, 'true')],
    async ({ page }) => {
      // 페이지에 접속하면
      const detail = new DetailPage(page);
      await detail.visit();

      // TODO: 강의평 삭제 기능 테스트

      // 강의평 점수 자세히 보기 기능 테스트
      const myEvaluation = detail.findByTestId('detail-evaluation-card').first();
      await expect(detail.findByTestId('detail-evaluation-score-dialog')).toHaveCount(0);
      await myEvaluation.locator('[data-testid=detail-evaluation-score-button]').click();
      await expect(detail.findByTestId('detail-evaluation-score-dialog')).toHaveAttribute('data-id', '6260');
      await expect(detail.findByTestId('detail-evaluation-score-dialog')).toHaveCount(1);
      await detail.findByTestId('detail-evaluation-score-dialog-close-button').click();
      await expect(detail.findByTestId('detail-evaluation-score-dialog')).toHaveCount(0);
    },
  ),
);

test(
  '좋아요 기능이 정상 동작한다',
  withCookie(
    // 강의평 목록이 둘 다 있을 경우
    [getTestCookie(TEST_DETAIL_EVALUATION_EXIST, 'true'), getTestCookie(TEST_DETAIL_MY_EVALUATION_EXIST, 'true')],
    async ({ page }) => {
      // 페이지에 접속하면
      const detail = new DetailPage(page);
      await detail.visit();

      const myEv = detail.findByTestId('detail-evaluation-card').first();
      const otherEv = detail.findByTestId('detail-evaluation-card').nth(1);

      // 좋아요 개수가 잘 나타나야 한다
      await expect(myEv.locator('[data-testid=like-button-count]')).toHaveText('19');
      await expect(otherEv.locator('[data-testid=like-button-count]')).toHaveText('107');

      // 좋아요 여부가 잘 나타나야 한다
      await expect(myEv.locator('[data-testid=like-button]')).toHaveAttribute('aria-checked', 'false');
      await expect(otherEv.locator('[data-testid=like-button]')).toHaveAttribute('aria-checked', 'true');

      // 좋아요 기능이 잘 동작해야 한다 (좋아요)
      await Promise.all([
        page.waitForRequest((req) => req.method() === 'POST'),
        page.waitForResponse((res) => res.url().includes(`/v1/evaluations/6260/likes`)),
        page.waitForRequest((req) => req.method() === 'GET' && req.url().includes(`/v1/lectures/353/evaluations`)),
        myEv.locator('[data-testid=like-button]').click(),
      ]);
      // TODO: 좋아요됐는지 테스트 필요

      // 좋아요 기능이 잘 동작해야 한다 (취소)
      await Promise.all([
        page.waitForRequest((req) => req.method() === 'DELETE'),
        page.waitForResponse((res) => res.url().includes(`/v1/evaluations/27/likes`)),
        page.waitForRequest((req) => req.method() === 'GET' && req.url().includes(`/v1/lectures/353/evaluations`)),
        otherEv.locator('[data-testid=like-button]').click(),
      ]);
      // TODO: 좋아요됐는지 테스트 필요
    },
  ),
);
