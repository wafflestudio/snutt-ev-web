import { GetSemesterLecturesResult } from "@lib/dto/getSemesterLectures"
import { GetTagInfosProcessedResult } from "../dto/getTagInfos"
import { GetLecturesQuery, GetLecturesResult } from "@lib/dto/getLectures"
import SnuttApi, { evClient, coreClient } from "./request"
import { GetEvaluationSummaryResponse } from "@lib/dto/getEvaluationSummary"
import {
  GetEvaluationsQuery,
  GetEvaluationsResult,
  GetMyEvaluationsResult,
} from "@lib/dto/getEvaluations"
import {
  PostEvaluationQuery,
  PostEvaluationResult,
} from "@lib/dto/postEvaluation"
import { GetMainTagInfosResult } from "@lib/dto/getMainTagInfos"
import {
  GetMainTagEvaluationsResult,
  GetMainTagEvalutionsQuery,
} from "@lib/dto/getMainTagEvaluations"
import { GetLatestLecturesResult } from "@lib/dto/getLatestLectures"
import {
  DeleteEvaluationParams,
  DeleteEvaluationResult,
} from "@lib/dto/deleteEvaluation"
import {
  PostReportEvaluationParams,
  PostReportEvaluationResult,
} from "@lib/dto/postReportEvaluation"
import { GetEmailVerificationResult } from "@lib/dto/getEmailVerification"
import {
  PostEmailVerificationCodeParams,
  PostEmailVerificationCodeResult,
} from "@lib/dto/PostEmailVerification"
import {
  PostEmailVerificationParams,
  PostEmailVerificationResult,
} from "@lib/dto/PostEmailVerification"

const evServiceBaseEndpoint = "/ev-service/v1"

// 지난 학기 들은 강의 목록 불러오는 api
export async function fetchLatestLectures(): Promise<GetLatestLecturesResult> {
  const endpoint = `v1/users/me/lectures/latest`
  const response = await evClient.get<GetLatestLecturesResult>(endpoint)
  return response.data
}

// 검색 시 필요한 태그 목록 불러오는 api
export async function fetchTagInfos(): Promise<GetTagInfosProcessedResult> {
  const endpoint = `/v1/tags/search`
  const response = await evClient.get<GetTagInfosProcessedResult>(endpoint)
  return response.data
}

// 강의평 생성 시 해당 강의 정보 및 해당 강의의 과거 개설 학기들 불러오는 api
export async function fetchSemesterLectures(
  id: number,
): Promise<GetSemesterLecturesResult> {
  const endpoint = `/v1/lectures/${id}/semester-lectures`
  const response = await evClient.get<GetSemesterLecturesResult>(endpoint)
  return response.data
}

export async function postLectureEvaluation(
  id: number,
  query: PostEvaluationQuery,
): Promise<PostEvaluationResult> {
  return SnuttApi.post(
    evServiceBaseEndpoint + `/semester-lectures/${id}/evaluations`,
    query,
  )
}

export async function fetchLectureEvaluations(
  id: number,
  params: GetEvaluationsQuery,
): Promise<GetEvaluationsResult> {
  return SnuttApi.get<GetEvaluationsResult>(
    evServiceBaseEndpoint + `/lectures/${id}/evaluations`,
    params,
  )
}

export async function fetchMyLectureEvaluations(
  id: number,
): Promise<GetMyEvaluationsResult> {
  return SnuttApi.get<GetMyEvaluationsResult>(
    evServiceBaseEndpoint + `/lectures/${id}/evaluations/users/me`,
  )
}

export async function fetchEvaluationSummary(
  id: number,
): Promise<GetEvaluationSummaryResponse> {
  return SnuttApi.get<GetEvaluationSummaryResponse>(
    evServiceBaseEndpoint + `/lectures/${id}/evaluation-summary`,
  )
}

export function getLectures(
  query: GetLecturesQuery,
): Promise<GetLecturesResult> {
  return SnuttApi.get<GetLecturesResult>(
    evServiceBaseEndpoint + "/lectures",
    query,
  )
}

export function getMainTagInfos(): Promise<GetMainTagInfosResult> {
  return SnuttApi.get<GetMainTagInfosResult>(
    evServiceBaseEndpoint + "/tags/main",
  )
}

export function getMainTagEvaluations(
  id: number,
  query: GetMainTagEvalutionsQuery,
): Promise<GetMainTagEvaluationsResult> {
  return SnuttApi.get<GetMainTagEvaluationsResult, GetMainTagEvalutionsQuery>(
    evServiceBaseEndpoint + `/tags/main/${id}/evaluations`,
    query,
  )
}

export function deleteEvaluation(id: number): Promise<DeleteEvaluationResult> {
  return SnuttApi.delete<DeleteEvaluationResult, DeleteEvaluationParams>(
    evServiceBaseEndpoint + `/evaluations/${id}`,
    {},
  )
}

export function postReportEvaluation(
  id: number,
  params: PostReportEvaluationParams,
): Promise<DeleteEvaluationResult> {
  return SnuttApi.post<PostReportEvaluationResult, PostReportEvaluationParams>(
    evServiceBaseEndpoint + `/evaluations/${id}/report`,
    params,
  )
}

export async function getEmailVerification(): Promise<GetEmailVerificationResult> {
  const endpoint = `v1/user/email/verification`
  const response = await coreClient.get<GetEmailVerificationResult>(endpoint)
  return response.data
}

export function postEmailVerification(
  params: PostEmailVerificationParams,
): Promise<PostEmailVerificationResult> {
  return SnuttApi.post<
    PostEmailVerificationResult,
    PostEmailVerificationParams
  >("/user/email/verification", params)
}

export function postEmailVerificationCode(
  params: PostEmailVerificationCodeParams,
): Promise<PostEmailVerificationCodeResult> {
  return SnuttApi.post<
    PostEmailVerificationCodeResult,
    PostEmailVerificationCodeParams
  >("/user/email/verification/code", params)
}
