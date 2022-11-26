import { test } from '@playwright/test';

import { getTestCookie } from '../utils/cookie';
import { withCookie } from '../utils/withCookiePage';
import { VerifyPage } from './_page';

test(
  '정상 상황일 경우, 제출 기능이 정상 동작한다',
  withCookie(
    // 메일 인증 안 된 유저
    [getTestCookie('TEST_USER_EMAIL_VERIFIED', 'false'), getTestCookie('TEST_USER_EMAIL_VERIFICATION_CODE', '937702')],
    async ({ page }) => {
      const vp = new VerifyPage(page);
      await vp.goto();

      await vp.get('email-input').type('woohm402');
      await Promise.all([
        page.waitForRequest(
          (req) =>
            req.method() === 'POST' &&
            req.url().includes('/verification') &&
            req.postData() === JSON.stringify({ email: 'woohm402@snu.ac.kr' }),
        ),
        page.waitForResponse((res) => res.status() === 200),
        vp.get('request-code-button').click(),
      ]);

      await vp.get('code-input').type('937702');

      await Promise.all([
        page.waitForRequest(
          (req) =>
            req.method() === 'POST' &&
            req.url().includes('/verification/code') &&
            req.postData() === JSON.stringify({ code: 937702 }),
        ),
        page.waitForResponse((res) => res.status() === 200),
        vp.get('submit-button').click(),
      ]);

      // TODO: main 으로 이동하는지 테스트
    },
  ),
);
