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

      // TODO: 강의평 신고 기능 테스트

      // TODO: 강의평 삭제 기능 테스트

      // TODO: 강의평 점수 자세히 보기 기능 테스트
      const myEvaluation = detail.findByTestId('detail-evaluation-card').first();
      await expect(detail.findByTestId('detail-evaluation-score-dialog')).toHaveCount(0);
      await myEvaluation.locator('[data-testid=detail-evaluation-score-button]').click();
      await expect(detail.findByTestId('detail-evaluation-score-dialog')).toHaveAttribute('data-id', '6260');
      await expect(detail.findByTestId('detail-evaluation-score-dialog')).toHaveCount(1);
    },
  ),
);
