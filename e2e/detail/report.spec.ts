import { expect, test } from '@playwright/test';

import { getTestCookie } from '../utils/cookie';
import { withCookie } from '../utils/withCookiePage';
import { DetailPage } from './_page';

const TEST_DETAIL_EVALUATION_EXIST = 'TEST_DETAIL_EVALUATION_EXIST';

test(
  '강의평 신고 성공 후 신고 사유 내용이 초기화된다.',
  withCookie(
    // 강의평 목록이 둘 다 있을 경우
    [getTestCookie(TEST_DETAIL_EVALUATION_EXIST, 'true')],
    async ({ page }) => {
      const detail = new DetailPage(page);
      await detail.visit(353);

      const otherEv = detail.findByTestId('detail-evaluation-card').nth(1);
      await otherEv.locator('[data-testid=detail-evaluation-more-button]').click();
      await detail.findByTestId('detail-evaluation-sheet-report').click();
      await detail.findByTestId('detail-evaluation-report-reason').type('test');
      await Promise.all([
        detail
          .getPage()
          .waitForRequest(
            (req) =>
              req.method() === 'POST' &&
              req.url().includes('/v1/evaluations/27/report') &&
              req.postData() === JSON.stringify({ content: 'test' }),
          ),
        detail.findByTestId('detail-evaluation-report-confirm').click(),
      ]);
      await detail
        .findByTestId('detail-evaluation-card')
        .nth(1)
        .locator('[data-testid=detail-evaluation-more-button]')
        .click();
      await detail.findByTestId('detail-evaluation-sheet-report').click();
      await expect(detail.findByTestId('detail-evaluation-report-reason')).toHaveValue('');
    },
  ),
);
