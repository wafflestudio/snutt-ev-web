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

export function fetchRecentLectures(): Promise<RecentLectureDTO[]> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          {
            id: "1",
            name: "소프트웨어 개발의 원리와 실습",
            department: "컴퓨터공학부",
            semester: "2021-2",
            grade: "3학년",
            lecturer: "최한결",
            location: "301-314",
          },
          {
            id: "2",
            name: "편집디자인",
            department: "디자인학부(디자인전공)",
            semester: "2021-2",
            grade: "3학년",
            lecturer: "서정민",
            location: "ㅇㅓ디지",
          },
          {
            id: "3",
            name: "데이터사이언티스트를 위한 금융공학",
            semester: "2021-2",
            department: "데이터사이언스대학원",
            grade: "석사",
            lecturer: "서정록",
            location: "123-4",
          },
        ]),
      1000,
    )
  })
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
  params: GetEvaluationsQuery,
): Promise<GetEvaluationsResult> {
  return SnuttApi.get<GetEvaluationsResult>(
    `/lectures/${params.id}/evaluations`,
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
