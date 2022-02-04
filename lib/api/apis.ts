import { GetSemesterLecturesResult } from "@lib/dto/getSemesterLectures"
import { GetTagInfosResult } from "../dto/getTagInfos"
import { GetLecturesQuery, GetLecturesResult } from "@lib/dto/getLectures"
import SnuttApi from "./request"
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
import { PostReportEvaluationParams, PostReportEvaluationResult } from "@lib/dto/postReportEvaluation"

export async function fetchLatestLectures(): Promise<GetLatestLecturesResult> {
  return SnuttApi.get<GetLatestLecturesResult>("/users/me/lectures/latest")
}

export async function fetchTagInfos(): Promise<GetTagInfosResult> {
  return SnuttApi.get<GetTagInfosResult>("/tags/search")
}

export async function fetchSemesterLectures(
  id: number,
): Promise<GetSemesterLecturesResult> {
  return SnuttApi.get<GetSemesterLecturesResult>(
    `/lectures/${id}/semester-lectures`,
  )
}

export async function postLectureEvaluation(
  id: number,
  query: PostEvaluationQuery,
): Promise<PostEvaluationResult> {
  return SnuttApi.post(`/semester-lectures/${id}/evaluations`, query)
}

export async function fetchLectureEvaluations(
  id: number,
  params: GetEvaluationsQuery,
): Promise<GetEvaluationsResult> {
  return SnuttApi.get<GetEvaluationsResult>(
    `/lectures/${id}/evaluations`,
    params,
  )
}

export async function fetchMyLectureEvaluations(
  id: number,
): Promise<GetMyEvaluationsResult> {
  return SnuttApi.get<GetMyEvaluationsResult>(
    `/lectures/${id}/evaluations/users/me`,
  )
}

export async function fetchEvaluationSummary(
  id: number,
): Promise<GetEvaluationSummaryResponse> {
  return SnuttApi.get<GetEvaluationSummaryResponse>(
    `/lectures/${id}/evaluation-summary`,
  )
}

export function getLectures(
  query: GetLecturesQuery,
): Promise<GetLecturesResult> {
  return SnuttApi.get<GetLecturesResult>("/lectures", query)
}

export function getMainTagInfos(): Promise<GetMainTagInfosResult> {
  return SnuttApi.get<GetMainTagInfosResult>("/tags/main")
}

export function getMainTagEvaluations(
  id: number,
  query: GetMainTagEvalutionsQuery,
): Promise<GetMainTagEvaluationsResult> {
  return SnuttApi.get<GetMainTagEvaluationsResult, GetMainTagEvalutionsQuery>(
    `/tags/main/${id}/evaluations`,
    query,
  )
}

export function deleteEvaluation(id: number): Promise<DeleteEvaluationResult> {
  return SnuttApi.delete<DeleteEvaluationResult, DeleteEvaluationParams>(
    `/evaluations/${id}`,
    {},
  )
}

export function postReportEvaluation(id: number, params: PostReportEvaluationParams): Promise<DeleteEvaluationResult> {
  return SnuttApi.post<PostReportEvaluationResult, PostReportEvaluationParams>(
    `/evaluations/${id}/report`,
    params
  )
}