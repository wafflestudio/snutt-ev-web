import { expect, test } from '@playwright/test';

import { getTestCookie } from '../utils/cookie';
import { withCookie } from '../utils/withCookiePage';
import { VerifyPage } from './_page';

test(
  '요청 시 다른 계정으로 인증된 메일일 경우',
  withCookie(
    // 메일 인증 안 된 유저
    [
      getTestCookie('TEST_USER_EMAIL_VERIFIED', 'false'),
      getTestCookie('TEST_USER_EMAIL_VERIFICATION_STATUS', 'ALREADY_VERIFIED'),
    ],
    async ({ page }) => {
      const vp = new VerifyPage(page);
      await vp.goto();

      await vp.get('email-input').type('woohm402');
      await vp.get('request-code-button').click();

      // 잘못 입력 결과
      await expect(vp.get('warning-text')).toHaveText('이미 인증된 계정입니다');
      await expect(vp.get('submit-button')).toBeDisabled();
    },
  ),
);

test(
  '제출 시 인증번호가 틀렸을 경우',
  withCookie(
    // 메일 인증 안 된 유저
    [getTestCookie('TEST_USER_EMAIL_VERIFIED', 'false'), getTestCookie('TEST_USER_EMAIL_VERIFICATION_CODE', '937702')],
    async ({ page }) => {
      const vp = new VerifyPage(page);
      await vp.goto();

      await vp.get('email-input').type('woohm402');
      await vp.get('request-code-button').click();

      // 잘못 입력
      await vp.get('code-input').type('93770');
      await vp.get('submit-button').click();

      // 잘못 입력 결과
      await expect(vp.get('warning-text')).toHaveText('인증번호가 틀렸습니다. 다시 시도해주세요');
      await expect(vp.get('submit-button')).toBeDisabled();
      await expect(vp.get('request-code-button')).toHaveText('다시 요청');

      // 재시도
      await vp.get('code-input').type('2');
      await vp.get('submit-button').click();
    },
  ),
);

test(
  '제출 시 시간초과됐을 경우',
  withCookie(
    // 메일 인증 안 된 유저
    [getTestCookie('TEST_USER_EMAIL_VERIFIED', 'false'), getTestCookie('TEST_USER_EMAIL_VERIFICATION_CODE', '937702')],
    async ({ page }) => {
      const vp = new VerifyPage(page);
      await vp.goto();

      await vp.get('email-input').type('woohm402');
      await vp.get('request-code-button').click();

      // 3초 대기 (타이머 expire)
      await vp.getPage().waitForTimeout(3000);

      // 잘못 입력 결과
      await expect(vp.get('warning-text')).toHaveText('인증요청에 실패했습니다. 다시 시도해주세요');
      await expect(vp.get('submit-button')).toBeDisabled();
      await expect(vp.get('request-code-button')).toHaveText('다시 요청');
    },
  ),
);
