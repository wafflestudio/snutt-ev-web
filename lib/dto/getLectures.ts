import { LectureDTO } from "./core/lecture"

export interface GetLecturesQuery {
  query?: string
  tags: number[]
  page: number
}

export interface GetLecturesResult {
  content: LectureDTO[]
  page?: number
  size: number
  last: boolean
}
