import { expect, test } from '@playwright/test';

import { getTestCookie } from '../utils/cookie';
import { withCookie } from '../utils/withCookiePage';
import { DetailPage } from './_page';

const TEST_DETAIL_EVALUATION_EXIST = 'TEST_DETAIL_EVALUATION_EXIST';
const TEST_DETAIL_MY_EVALUATION_EXIST = 'TEST_DETAIL_MY_EVALUATION_EXIST';

test(
  'on_back=close 파라미터가 넘어왔을 경우 잘 동작한다',
  withCookie(
    // 강의평 목록이 둘 다 있을 경우
    [getTestCookie(TEST_DETAIL_EVALUATION_EXIST, 'true'), getTestCookie(TEST_DETAIL_MY_EVALUATION_EXIST, 'true')],
    async ({ page }) => {
      // on_back 파라미터로 페이지에 접속하면
      const detail = new DetailPage(page);
      const params = new URLSearchParams();
      params.set('on_back', 'close');
      await detail.visit(353, params);

      await detail.findByTestId('close-button').click();
      await expect(detail.getPage()).toHaveURL('/detail?id=353&on_back=close');
    },
  ),
);
