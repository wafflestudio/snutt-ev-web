import { GetServerSidePropsContext } from 'next';

import { DeleteEvaluationResult } from '@/lib/dto/deleteEvaluation';
import { GetEmailVerificationResult } from '@/lib/dto/getEmailVerification';
import {
  GetEvaluationsQuery,
  GetEvaluationsResult,
  GetMyEvaluationsResult,
} from '@/lib/dto/getEvaluations';
import { GetEvaluationSummaryResponse } from '@/lib/dto/getEvaluationSummary';
import { GetLatestLecturesResult } from '@/lib/dto/getLatestLectures';
import { GetLecturesQuery, GetLecturesResult } from '@/lib/dto/getLectures';
import {
  GetMainTagEvaluationsResult,
  GetMainTagEvalutionsQuery,
} from '@/lib/dto/getMainTagEvaluations';
import { GetMainTagInfosResult } from '@/lib/dto/getMainTagInfos';
import { GetSemesterLecturesResult } from '@/lib/dto/getSemesterLectures';
import {
  PostEmailVerificationCodeParams,
  PostEmailVerificationCodeResult,
} from '@/lib/dto/PostEmailVerification';
import {
  PostEmailVerificationParams,
  PostEmailVerificationResult,
} from '@/lib/dto/PostEmailVerification';
import {
  PostEvaluationQuery,
  PostEvaluationResult,
} from '@/lib/dto/postEvaluation';
import {
  PostReportEvaluationParams,
  PostReportEvaluationResult,
} from '@/lib/dto/postReportEvaluation';

import { GetTagInfosProcessedResult } from '../dto/getTagInfos';
import { coreClient, evClient, getServerSideHeaders } from './request';

type Context = { context?: GetServerSidePropsContext };
type Args<P = undefined, Q = undefined, B = undefined> = Context &
  (P extends undefined ? unknown : { params: P }) &
  (Q extends undefined ? unknown : { query: Q }) &
  (B extends undefined ? unknown : { body: B });

// 지난 학기 들은 강의 목록 불러오는 api
export async function fetchLatestLectures(args: Args = {}) {
  const endpoint = `v1/users/me/lectures/latest`;
  const headers = getServerSideHeaders(args.context);

  const response = await evClient.get<GetLatestLecturesResult>(endpoint, {
    headers,
  });
  return response.data;
}

// 검색 시 필요한 태그 목록 불러오는 api
export async function fetchTagInfos(args: Args = {}) {
  const endpoint = `/v1/tags/search`;
  const headers = getServerSideHeaders(args.context);

  const response = await evClient.get<GetTagInfosProcessedResult>(endpoint, {
    headers,
  });
  return response.data;
}

// 강의평 생성 시 해당 강의 정보 및 해당 강의의 과거 개설 학기들 불러오는 api
export async function fetchSemesterLectures(args: Args<{ id: number }>) {
  const endpoint = `/v1/lectures/${args.params.id}/semester-lectures`;
  const headers = getServerSideHeaders(args.context);

  const response = await evClient.get<GetSemesterLecturesResult>(endpoint, {
    headers,
  });
  return response.data;
}

// 강의평 생성 api
export async function postLectureEvaluation(
  args: Args<{ id: number }, undefined, PostEvaluationQuery>,
) {
  const endpoint = `/v1/semester-lectures/${args.params.id}/evaluations`;
  const headers = getServerSideHeaders(args.context);

  const response = await evClient.post<PostEvaluationResult>(
    endpoint,
    args.body,
    { headers },
  );
  return response.data;
}

// 강좌의 강의평 목록 api
export async function fetchLectureEvaluations(
  args: Args<{ id: number }, GetEvaluationsQuery>,
) {
  const endpoint = `v1/lectures/${args.params.id}/evaluations`;
  const headers = getServerSideHeaders(args.context);

  const response = await evClient.get<GetEvaluationsResult>(endpoint, {
    params: args.query,
    headers,
  });
  return response.data;
}

export async function fetchMyLectureEvaluations(args: Args<{ id: number }>) {
  const endpoint = `/v1/lectures/${args.params.id}/evaluations/users/me`;
  const headers = getServerSideHeaders(args.context);

  const response = await evClient.get<GetMyEvaluationsResult>(endpoint, {
    headers,
  });
  return response.data;
}

export async function fetchEvaluationSummary(args: Args<{ id: number }>) {
  const endpoint = `/v1/lectures/${args.params.id}/evaluation-summary`;
  const headers = getServerSideHeaders(args.context);

  const response = await evClient.get<GetEvaluationSummaryResponse>(endpoint, {
    headers,
  });
  return response.data;
}

export async function getLectures(args: Args<undefined, GetLecturesQuery>) {
  const endpoint = `/v1/lectures`;
  const headers = getServerSideHeaders(args.context);

  const params = { ...args.query, tags: args.query.tags.join(',') };

  const response = await evClient.get<GetLecturesResult>(endpoint, {
    params,
    headers,
  });
  return response.data;
}

export async function getMainTagInfos(args: Args = {}) {
  const endpoint = `/v1/tags/main`;
  const headers = getServerSideHeaders(args.context);

  const response = await evClient.get<GetMainTagInfosResult>(endpoint, {
    headers,
  });
  return response.data;
}

export async function getMainTagEvaluations(
  args: Args<{ id: number }, GetMainTagEvalutionsQuery>,
) {
  const endpoint = `/v1/tags/main/${args.params.id}/evaluations`;
  const headers = getServerSideHeaders(args.context);

  const response = await evClient.get<GetMainTagEvaluationsResult>(endpoint, {
    params: args.query,
    headers,
  });
  return response.data;
}

export async function deleteEvaluation(args: Args<{ id: number }>) {
  const endpoint = `/v1/evaluations/${args.params.id}`;
  const headers = getServerSideHeaders(args.context);

  const response = await evClient.delete<DeleteEvaluationResult>(endpoint, {
    headers,
  });
  return response.data;
}

export async function postReportEvaluation(
  args: Args<{ id: number }, undefined, PostReportEvaluationParams>,
) {
  const endpoint = `/v1/evaluations/${args.params.id}/report`;
  const headers = getServerSideHeaders(args.context);

  const response = await evClient.post<PostReportEvaluationResult>(
    endpoint,
    args.body,
    { headers },
  );
  return response.data;
}

export async function getEmailVerification(
  args: Args,
): Promise<GetEmailVerificationResult> {
  const endpoint = `/v1/user/email/verification`;
  const headers = getServerSideHeaders(args.context);

  console.log(headers);

  const response = await coreClient.get<GetEmailVerificationResult>(endpoint, {
    headers,
  });
  return response.data;
}

export async function postEmailVerification(
  args: Args<undefined, undefined, PostEmailVerificationParams>,
) {
  const endpoint = `/v1/user/email/verification`;
  const headers = getServerSideHeaders(args.context);

  const response = await coreClient.post<PostEmailVerificationResult>(
    endpoint,
    args.body,
    { headers },
  );
  return response.data;
}

export async function postEmailVerificationCode(
  args: Args<undefined, undefined, PostEmailVerificationCodeParams>,
) {
  const endpoint = `/v1/user/email/verification/code`;
  const headers = getServerSideHeaders(args.context);

  const response = await coreClient.post<PostEmailVerificationCodeResult>(
    endpoint,
    args.body,
    { headers },
  );
  return response.data;
}
