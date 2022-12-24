import { expect, test } from '@playwright/test';

import { getTestCookie } from '../utils/cookie';
import { withCookie } from '../utils/withCookiePage';
import { DetailPage } from './_page';

const TEST_DETAIL_EVALUATION_EXIST = 'TEST_DETAIL_EVALUATION_EXIST';

test(
  '강의평 신고 기능이 정상 동작한다',
  withCookie([getTestCookie(TEST_DETAIL_EVALUATION_EXIST, 'true')], async ({ page }) => {
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
  }),
);

test(
  '강의평 중복 신고 시 에러 메세지가 정상적으로 보여진다',
  withCookie([getTestCookie(TEST_DETAIL_EVALUATION_EXIST, 'true')], async () => {
    // TODO: implement
  }),
);

test(
  '강의평 신고 성공 후 신고 사유 내용이 초기화된다.',
  withCookie([getTestCookie(TEST_DETAIL_EVALUATION_EXIST, 'true')], async ({ page }) => {
    const detail = new DetailPage(page);
    await detail.visit(353);

    const otherEv = detail.findByTestId('detail-evaluation-card').nth(1);
    await otherEv.locator('[data-testid=detail-evaluation-more-button]').click();
    await detail.findByTestId('detail-evaluation-sheet-report').click();
    await detail.findByTestId('detail-evaluation-report-reason').type('test');
    await detail.findByTestId('detail-evaluation-report-confirm').click();
    await otherEv.locator('[data-testid=detail-evaluation-more-button]').click();
    await detail.findByTestId('detail-evaluation-sheet-report').click();
    await expect(detail.findByTestId('detail-evaluation-report-reason')).toHaveValue('');
  }),
);
