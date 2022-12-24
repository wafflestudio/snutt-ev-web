import { rest } from 'msw';

import {
  GetEvaluationsResult,
  GetEvaluationSummaryResponse,
  GetLatestLecturesResult,
  GetMainTagEvaluationsResult,
  GetMainTagInfosResult,
  GetMyLectureEvaluationsResult,
  GetSemesterLecturesResult,
  GetTagInfosProcessedResult,
  ListMyEvaluationsResponse,
  PostReportEvaluationResult,
} from '@/apis/ev/types';

import {
  mockEvaluationSummary,
  mockLatestLectures,
  mockLectureEvaluations,
  mockMainEvaluations,
  mockMainTags,
  mockMyEvaluations,
  mockMyLectureEvaluations,
  mockSemesterLectures,
} from './fixtures';

const getPaginatedResult = <T extends { id: number }>(
  baseContents: T[],
  cursor?: string,
  options?: { maxPage?: number },
) => {
  const _cursor = Number(cursor ?? 0);
  const size = baseContents.length;
  const MAX_PAGE = options?.maxPage ?? 4;
  const total_count = MAX_PAGE * size;
  const isLastPage = _cursor >= (MAX_PAGE - 1) * size;
  const content = baseContents.map((ev) => ({
    ...ev,
    id: ev.id + _cursor,
  }));

  return { content, cursor: isLastPage ? null : `${_cursor + size}`, size, last: isLastPage, total_count };
};

export const evHandlers = [
  rest.get<never, never, GetLatestLecturesResult>('*/v1/users/me/lectures/latest', (req, res, ctx) => {
    const { TEST_RECENT_LECTURES_EXIST = 'true' } = req.cookies;

    const isFilterNoMyEvaluation = req.url.searchParams.get('filter') === 'no-my-evaluations';

    switch (TEST_RECENT_LECTURES_EXIST) {
      case 'true':
        return res(
          isFilterNoMyEvaluation
            ? ctx.json({ content: mockLatestLectures.slice(0, 2), total_count: 2 })
            : ctx.json({ content: mockLatestLectures, total_count: 6 }),
        );
      case 'false':
        return res(ctx.json({ content: [], total_count: 0 }));
    }
  }),

  rest.get<never, never, GetMainTagInfosResult>(`*/v1/tags/main`, (req, res, ctx) => {
    return res(ctx.json(mockMainTags));
  }),

  rest.get<never, { tagId: string }, GetMainTagEvaluationsResult>(
    `*/v1/tags/main/:tagId/evaluations`,
    (req, res, ctx) => {
      const { TEST_MAIN_EVALUATION_EXIST = 'true' } = req.cookies;
      if (TEST_MAIN_EVALUATION_EXIST === 'false') return res(ctx.json({ content: [], cursor: null }));

      const paginatedResult = getPaginatedResult(mockMainEvaluations, req.url.searchParams.get('cursor') ?? undefined);

      return res(ctx.json(paginatedResult));
    },
  ),

  rest.get<never, { lectureId: string }, GetSemesterLecturesResult>(
    `*/v1/lectures/:lectureId/semester-lectures`,
    (req, res, ctx) => {
      return res(ctx.json(mockSemesterLectures));
    },
  ),

  rest.get<never, never, ListMyEvaluationsResponse>(`*/v1/evaluations/users/me`, (req, res, ctx) => {
    const { TEST_MY_EVALUATION_EXIST = 'true' } = req.cookies;
    if (TEST_MY_EVALUATION_EXIST === 'false')
      return res(ctx.json({ content: [], cursor: null, size: 20, last: true, total_count: 0 }));

    const paginatedResult = getPaginatedResult(mockMyEvaluations, req.url.searchParams.get('cursor') ?? undefined);

    return res(ctx.json(paginatedResult));
  }),

  rest.get<never, never, GetEvaluationSummaryResponse>(
    `*/v1/lectures/:lectureId/evaluation-summary`,
    (req, res, ctx) => {
      return res(ctx.json(mockEvaluationSummary));
    },
  ),

  rest.get<never, never, GetMyLectureEvaluationsResult>(
    `*/v1/lectures/:lectureId/evaluations/users/me`,
    (req, res, ctx) => {
      const { TEST_DETAIL_MY_EVALUATION_EXIST = 'true' } = req.cookies;
      if (TEST_DETAIL_MY_EVALUATION_EXIST === 'false') return res(ctx.json({ evaluations: [] }));

      return res(ctx.json(mockMyLectureEvaluations));
    },
  ),

  rest.get<never, never, GetEvaluationsResult>(`*/v1/lectures/:lectureId/evaluations`, (req, res, ctx) => {
    const { TEST_DETAIL_EVALUATION_EXIST = 'true' } = req.cookies;
    if (TEST_DETAIL_EVALUATION_EXIST === 'false')
      return res(ctx.json({ content: [], cursor: null, size: 20, last: true, total_count: 0 }));

    const paginatedResult = getPaginatedResult(mockLectureEvaluations, req.url.searchParams.get('cursor') ?? undefined);
    return res(ctx.json(paginatedResult));
  }),

  rest.post<never, never>(`*/v1/evaluations/:id/likes`, (req, res, ctx) => {
    return res(ctx.delay(300), ctx.status(200));
  }),

  rest.delete<never, never>(`*/v1/evaluations/:id/likes`, (req, res, ctx) => {
    return res(ctx.delay(300), ctx.status(200));
  }),

  rest.post(`*/v1/semester-lectures/:id/evaluations`, (req, res, ctx) => {
    return res(ctx.json({})); // TODO: 실패 케이스
  }),

  rest.get<never, never, GetTagInfosProcessedResult>(`*/v1/tags/search`, (req, res, ctx) => {
    return res(ctx.json({ tag_groups: [] })); // TODO: 제대로
  }),

  rest.post<{ content: string }, { id: string }, PostReportEvaluationResult>(
    `*/v1/evaluations/:id/report`,
    (req, res, ctx) => {
      const evaluationId = req.params.id;
      const body = req.body;

      return res(
        ctx.json({
          content: body.content,
          id: Number(evaluationId),
          is_hidden: false,
          lecture_evaluation_id: Number(evaluationId),
          user: { email: 'woohm402@snu.ac.kr', id: '1', local_id: '2' },
        }),
      );
    },
  ),
];
