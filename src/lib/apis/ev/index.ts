import { evClient } from '@/clients/axiosEvClient';
import { Args } from '@/lib/util/apiArgs';
import { getServerSideHeaders } from '@/lib/util/getServerSideHeaders';

import type {
  DeleteEvaluationResult,
  GetEvaluationsQuery,
  GetEvaluationsResult,
  GetEvaluationSummaryResponse,
  GetLatestLecturesResult,
  GetLecturesQuery,
  GetLecturesResult,
  GetMainTagEvaluationsResult,
  GetMainTagEvalutionsQuery,
  GetMainTagInfosResult,
  GetMyLectureEvaluationsResult,
  GetSemesterLecturesResult,
  GetTagInfosProcessedResult,
  ListMyEvaluationsResponse,
  PostEvaluationQuery,
  PostEvaluationResult,
  PostReportEvaluationParams,
  PostReportEvaluationResult,
} from './types';

// 지난 학기 들은 강의 목록 불러오는 api
export async function fetchLatestLectures(args: Args = {}) {
  const endpoint = `/v1/users/me/lectures/latest`;
  const headers = getServerSideHeaders(args.context);

  const response = await evClient.get<GetLatestLecturesResult>(endpoint, { headers });
  return response.data;
}

// 검색 시 필요한 태그 목록 불러오는 api
export async function fetchTagInfos(args: Args = {}) {
  const endpoint = `/v1/tags/search`;
  const headers = getServerSideHeaders(args.context);

  const response = await evClient.get<GetTagInfosProcessedResult>(endpoint, { headers });
  return response.data;
}

// 강의평 생성 시 해당 강의 정보 및 해당 강의의 과거 개설 학기들 불러오는 api
export async function fetchSemesterLectures(args: Args<{ id: number }>) {
  const endpoint = `/v1/lectures/${args.params.id}/semester-lectures`;
  const headers = getServerSideHeaders(args.context);

  const response = await evClient.get<GetSemesterLecturesResult>(endpoint, { headers });
  return response.data;
}

// 강의평 생성 api
export async function postLectureEvaluation(args: Args<{ id: number }, undefined, PostEvaluationQuery>) {
  const endpoint = `/v1/semester-lectures/${args.params.id}/evaluations`;
  const headers = getServerSideHeaders(args.context);

  const response = await evClient.post<PostEvaluationResult>(endpoint, args.body, { headers });
  return response.data;
}

// 강좌의 강의평 목록 api
export async function fetchLectureEvaluations(args: Args<{ id: number }, GetEvaluationsQuery>) {
  const endpoint = `v1/lectures/${args.params.id}/evaluations`;
  const headers = getServerSideHeaders(args.context);

  const response = await evClient.get<GetEvaluationsResult>(endpoint, { params: args.query, headers });
  return response.data;
}

export async function fetchMyLectureEvaluations(args: Args<{ id: number }>) {
  const endpoint = `/v1/lectures/${args.params.id}/evaluations/users/me`;
  const headers = getServerSideHeaders(args.context);

  const response = await evClient.get<GetMyLectureEvaluationsResult>(endpoint, { headers });
  return response.data;
}

export async function fetchEvaluationSummary(args: Args<{ id: number }>) {
  const endpoint = `/v1/lectures/${args.params.id}/evaluation-summary`;
  const headers = getServerSideHeaders(args.context);

  const response = await evClient.get<GetEvaluationSummaryResponse>(endpoint, { headers });
  return response.data;
}

export async function getLectures(args: Args<undefined, GetLecturesQuery>) {
  const endpoint = `/v1/lectures`;
  const headers = getServerSideHeaders(args.context);

  const params = { ...args.query, tags: args.query.tags.join(',') };

  const response = await evClient.get<GetLecturesResult>(endpoint, { params, headers });
  return response.data;
}

export async function getMainTagInfos(args: Args = {}) {
  const endpoint = `/v1/tags/main`;
  const headers = getServerSideHeaders(args.context);

  const response = await evClient.get<GetMainTagInfosResult>(endpoint, { headers });
  return response.data;
}

export async function getMainTagEvaluations(args: Args<{ id: number }, GetMainTagEvalutionsQuery>) {
  const endpoint = `/v1/tags/main/${args.params.id}/evaluations`;
  const headers = getServerSideHeaders(args.context);

  const response = await evClient.get<GetMainTagEvaluationsResult>(endpoint, { params: args.query, headers });
  return response.data;
}

export async function deleteEvaluation(args: Args<{ id: number }>) {
  const endpoint = `/v1/evaluations/${args.params.id}`;
  const headers = getServerSideHeaders(args.context);

  const response = await evClient.delete<DeleteEvaluationResult>(endpoint, { headers });
  return response.data;
}

export async function postReportEvaluation(args: Args<{ id: number }, undefined, PostReportEvaluationParams>) {
  const endpoint = `/v1/evaluations/${args.params.id}/report`;
  const headers = getServerSideHeaders(args.context);

  const response = await evClient.post<PostReportEvaluationResult>(endpoint, args.body, { headers });
  return response.data;
}

export async function listMyEvaluations(args: Args<undefined, { cursor?: string }>) {
  const endpoint = `/v1/evaluations/users/me`;
  const headers = getServerSideHeaders(args.context);
  const query = new URLSearchParams();
  if (args.query.cursor) query.set('cursor', args.query.cursor);

  const response = await evClient.get<ListMyEvaluationsResponse>(endpoint, { headers, params: query });
  return response.data;
}
