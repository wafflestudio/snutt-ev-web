import { rest } from 'msw';

import { GetLatestLecturesResult } from '@/lib/dto/getLatestLectures';
import { GetMainTagEvaluationsResult } from '@/lib/dto/getMainTagEvaluations';
import { GetMainTagInfosResult } from '@/lib/dto/getMainTagInfos';

import { mockLatestLectures, mockMainEvaluations, mockMainTags } from './fixtures';

export const evHandlers = [
  rest.get<never, never, GetLatestLecturesResult>('*/v1/users/me/lectures/latest', (req, res, ctx) => {
    const { TEST_RECENT_LECTURES_EXIST = 'true' } = req.cookies;

    switch (TEST_RECENT_LECTURES_EXIST) {
      case 'true':
        return res(ctx.json(mockLatestLectures));
      case 'false':
        return res(ctx.json({ content: [], total_count: 0 }));
    }
  }),

  rest.get<never, never, GetMainTagInfosResult>(`*/v1/tags/main`, (req, res, ctx) => {
    // TODO: track this here
    // https://wafflestudio.slack.com/archives/C0PAVPS5T/p1663401847494509
    // eslint-disable-next-line
      // @ts-ignore
    return res(ctx.json(mockMainTags));
  }),

  rest.get<never, { tagId: string }, GetMainTagEvaluationsResult>(
    `*/v1/tags/main/:tagId/evaluations`,
    (req, res, ctx) => {
      const { TEST_MAIN_EVALUATION_EXIST = 'true' } = req.cookies;
      if (TEST_MAIN_EVALUATION_EXIST === 'false') return res(ctx.json({ content: [], cursor: null }));

      const cursor = Number(req.url.searchParams.get('cursor') ?? 0);
      const size = mockMainEvaluations.length;
      const MAX_PAGE = 4;
      const total_count = MAX_PAGE * size;
      const content = mockMainEvaluations.map((ev) => ({
        ...ev,
        id: ev.id + cursor,
      }));

      const isLastPage = cursor >= (MAX_PAGE - 1) * size;

      return res(
        ctx.json({
          content,
          cursor: isLastPage ? null : `${cursor + size}`,
          size,
          last: isLastPage,
          total_count,
        }),
      );
    },
  ),
];
