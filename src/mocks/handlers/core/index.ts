import { rest } from 'msw';

export const coreHandlers = [
  rest.get('*/v1/user/email/verification', (req, res, ctx) => {
    return res(ctx.json({ is_email_verified: true }));
  }),
];
