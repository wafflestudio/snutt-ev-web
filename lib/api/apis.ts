import { RecentLectureDTO } from "@lib/dto/recentLecture"
import { ReviewDetailDTO, ReviewDTO } from "@lib/dto/review"
import { GetSemesterLecturesResult } from "@lib/dto/getSemesterLectures"
import { GetTagInfosResult } from "../dto/getTagInfos"
import { GetLecturesQuery, GetLecturesResult } from "@lib/dto/getLectures"
import SnuttApi from "./request"
import { GetEvaluationSummaryResponse } from "@lib/dto/getEvaluationSummary"
import {
  GetEvaluationsQuery,
  GetEvaluationsResult,
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

export function fetchRecentReviews(): Promise<ReviewDTO[]> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          { id: "an", name: "최근 리뷰다 a", point: 1 },
          { id: "bn", name: "최근 리뷰다 b", point: 2 },
          { id: "cn", name: "최근 리뷰다 c", point: 3 },
        ]),
      3000,
    )
  })
}

export function fetchMyReviews(): Promise<ReviewDTO[]> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          { id: "am", name: "내 리뷰다 a", point: 1 },
          { id: "bm", name: "내 리뷰다 b", point: 2 },
          { id: "cm", name: "내 리뷰다 c", point: 3 },
        ]),
      3000,
    )
  })
}

export function fetchMainReviews(): Promise<ReviewDetailDTO[]> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          {
            id: "1",
            name: "편집디자인",
            point: 3,
            semester: "2021-1",
            contents: "짧은 리뷰",
          },
          {
            id: "2",
            name: "편집디자인",
            point: 3.25,
            semester: "2021-1",
            contents:
              "긴 리뷰. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요.강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요.강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. ",
          },
          {
            id: "3",
            name: "편집디자인",
            point: 4.75,
            semester: "2021-1",
            contents:
              "중간 리뷰. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요. 강의평 내용을 입력하세요 ",
          },
          {
            id: "4",
            name: "편집디자인",
            point: 1.3,
            semester: "2021-1",
            contents: "짧은 리뷰",
          },
          {
            id: "5",
            name: "편집디자인",
            point: 1.2,
            semester: "2021-1",
            contents: "짧은 리뷰",
          },
        ]),
      1000,
    )
  })
}

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
