import { rest } from 'msw';

export const coreHandlers = [
  rest.get<never, never, { is_email_verified: boolean }>('*/v1/user/email/verification', (req, res, ctx) => {
    const { TEST_USER_EMAIL_VERIFIED = 'true' } = req.cookies;

    return res(ctx.json({ is_email_verified: TEST_USER_EMAIL_VERIFIED === 'true' }));
  }),

  rest.post<{ email: string }, never, { errcode?: number; ext?: unknown; message: string }>(
    '*/v1/user/email/verification',
    (req, res, ctx) => {
      const { TEST_USER_EMAIL_VERIFICATION_STATUS } = req.cookies;

      if (!req.body.email.includes('@snu.ac.kr')) return res(ctx.status(400));

      if (TEST_USER_EMAIL_VERIFICATION_STATUS === 'ALREADY_VERIFIED')
        return res(
          ctx.status(409),
          ctx.json({ errcode: 36864, ext: {}, message: '해당 이메일로 인증된 다른 계정이 있습니다' }),
        );

      return res(ctx.json({ message: 'ok' }));
    },
  ),

  rest.post<{ code: number }, never, { is_email_verified: boolean } | { errcode: number }>(
    '*/v1/user/email/verification/code',
    (req, res, ctx) => {
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
