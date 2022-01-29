import {
  fetchMainReviews,
  fetchRecentLectures,
  getMainTagInfos,
} from "@lib/api/apis"
import { useQuery } from "react-query"

export function useContainer() {
  const { data } = useQuery("mainTags", getMainTagInfos)
  return { recommendationTags: data?.tags ?? [] }
}

export function useMainReviewContainer() {
  const querySearch = useQuery("reviews/curation", fetchMainReviews)

  const { data, error } = querySearch

  return {
    curationData: data,
    error,
  }
}

export function useMainRecentContainer() {
  const querySearch = useQuery("lectures/recent", fetchRecentLectures)

  const { data, error } = querySearch

  return {
    recentLectureData: data,
    error,
  }
}
