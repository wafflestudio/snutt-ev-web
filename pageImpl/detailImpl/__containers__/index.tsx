import { fetchLectureReviews } from "@lib/api/apis"
import { useQuery } from "react-query"

export function useLectureReviewContainer() {
  const querySearch = useQuery("reviews/lecture_name", fetchLectureReviews)

  const { data, error } = querySearch

  return {
    reviewData: data,
    error,
  }
}
