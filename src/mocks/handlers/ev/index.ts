import { rest } from 'msw';

import { latestLectures } from './fixtures';

export const evHandlers = [
  rest.get('*/v1/users/me/lectures/latest', (req, res, ctx) => {
    return res(ctx.json(latestLectures));
  }),
];
