import { rest } from 'msw';

import { GetLatestLecturesResult } from '@/lib/dto/getLatestLectures';
import { GetMainTagEvaluationsResult } from '@/lib/dto/getMainTagEvaluations';
import { GetMainTagInfosResult } from '@/lib/dto/getMainTagInfos';

import {
  mockLatestLectures,
  mockMainEvaluations,
  mockMainTags,
} from './fixtures';

export const evHandlers = [
  rest.get<never, never, GetLatestLecturesResult>(
    '*/v1/users/me/lectures/latest',
    (req, res, ctx) => {
      return res(ctx.json(mockLatestLectures));
    },
  ),

  rest.get<never, never, GetMainTagInfosResult>(
    `*/v1/tags/main`,
    (req, res, ctx) => {
      // TODO: track this here
      // https://wafflestudio.slack.com/archives/C0PAVPS5T/p1663401847494509
      // eslint-disable-next-line
      // @ts-ignore
      return res(ctx.json(mockMainTags));
    },
  ),

  rest.get<never, { tagId: string }, GetMainTagEvaluationsResult>(
    `*/v1/tags/main/:tagId/evaluations`,
    (req, res, ctx) => {
      return res(ctx.json(mockMainEvaluations));
    },
  ),
];
