import { rest } from 'msw';

export const coreHandlers = [
  rest.get<never, never, { is_email_verified: boolean }>('*/v1/user/email/verification', (req, res, ctx) => {
    const { TEST_USER_EMAIL_VERIFIED = 'true' } = req.cookies;

    return res(ctx.json({ is_email_verified: TEST_USER_EMAIL_VERIFIED === 'true' }));
  }),

  rest.post<{ email: string }, never, { message: 'ok' }>('*/v1/user/email/verification', (req, res, ctx) => {
    if (!req.body.email.includes('@snu.ac.kr')) return res(ctx.status(400));

    return res(ctx.json({ message: 'ok' }));
  }),

  rest.post<{ code: number }, never, { is_email_verified: boolean } | { errcode: number }>(
    '*/v1/user/email/verification/code',
    (req, res, ctx) => {
      // TODO: 고민 필요, 실패 케이스가 너무 많은데, 그걸 다 테스트할 건지? 테스트할 거라면, cookie 값은 TEST_USER_EMAIL_VERIFY_RESULT 로 하고 enum 으로 가야 할듯
      const { TEST_USER_EMAIL_VERIFICATION_CODE = '111111' } = req.cookies;

      if (TEST_USER_EMAIL_VERIFICATION_CODE !== `${req.body.code}`)
        return res(
          ctx.status(400),
          ctx.json({ errcode: 4112, message: '유효하지 않은 인증코드입니다.', ext: { code: req.body.code } }),
        );

      return res(ctx.json({ is_email_verified: true }));
    },
  ),
];
