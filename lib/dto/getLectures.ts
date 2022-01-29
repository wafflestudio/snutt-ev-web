import { LectureDTO } from "./core/lecture"
import { TagDTO } from "./core/tag"

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
