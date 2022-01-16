import { LectureDTO } from "./core/lecture"
import { TagDTO } from "./core/tag"

export interface GetLecturesQuery {
  query?: string
  tags: TagDTO[]
  page: number
}

export interface GetLecturesResult {
  content: LectureDTO[]
  next_page?: number
}
