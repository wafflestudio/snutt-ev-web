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

      const myEv = detail.findByTestId('detail-evaluation-card').first();
      const otherEv = detail.findByTestId('detail-evaluation-card').nth(1);

      // 내 강의평의 좋아요 개수 19개
      await expect(myEv.locator('[data-testid=like-button-count]')).toHaveText('19');

      // 다른 사람 첫번째 강의평의 좋아요 개수 107개
      await expect(otherEv.locator('[data-testid=like-button-count]')).toHaveText('107');

      // 좋아요 여부가 잘 나타나야 한다
      await expect(myEv.locator('[data-testid=like-button]')).toHaveAttribute('aria-checked', 'false');
      await expect(otherEv.locator('[data-testid=like-button]')).toHaveAttribute('aria-checked', 'true');

      // TODO: 강의평 신고 기능 테스트

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
