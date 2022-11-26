import { expect, test } from '@playwright/test';

import { getTestCookie } from '../utils/cookie';
import { withCookie } from '../utils/withCookiePage';
import { VerifyPage } from './_page';

test(
  '메일 인증된 유저는 접근할 수 없다',
  withCookie(
    // 메일 인증된 유저
    [getTestCookie('TEST_USER_EMAIL_VERIFIED', 'true')],
    async ({ page }) => {
      // 페이지에 접속하면 메인으로 튕겨난다
      const vp = new VerifyPage(page);
      await vp.goto();
      await expect(vp.getPage()).toHaveURL('main');
    },
  ),
);

test(
  '접속 시 기본 ui가 잘 보인다',
  withCookie(
    // 메일 인증되지 않은 유저
    [getTestCookie('TEST_USER_EMAIL_VERIFIED', 'false')],
    async ({ page }) => {
      const vp = new VerifyPage(page);
      await vp.goto();

      await expect(vp.get('header')).toHaveCount(1);
      await expect(vp.get('email-input')).toHaveValue('');
      await expect(vp.get('code-input')).toHaveValue('');
      await expect(vp.get('request-code-button')).toBeDisabled();
      await expect(vp.get('request-code-button')).toHaveText('인증요청');
      await expect(vp.get('warning-text')).toHaveText('');
      await expect(vp.get('submit-button')).toBeDisabled();
    },
  ),
);
