import { fetchMainReviews } from "@lib/api/apis"
import { useQuery } from "react-query"

export function useMainReviewContainer() {
  const querySearch = useQuery("reviews/curation", fetchMainReviews)

  const { data, error } = querySearch

  return {
    data,
    error,
  }
}
