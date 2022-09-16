import { LatestLectureDTO } from "@/lib/dto/core/latestLecture";

export interface GetLatestLecturesResult {
  content: LatestLectureDTO[];
  total_count: number;
}
