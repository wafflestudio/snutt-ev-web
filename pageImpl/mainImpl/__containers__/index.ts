import {
  fetchMainReviews,
  fetchRecentLectures,
  getMainTagEvaluations,
  getMainTagInfos,
} from "@lib/api/apis"
import { TagDTO } from "@lib/dto/core/tag"
import { useInfiniteQuery, useQuery } from "react-query"

export function useRecommendationTagsContainer() {
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

export function useMainEvaluationContainer(selectedTag?: TagDTO) {
  const {
    data: searchResult,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["tagEvaluations", selectedTag],
    ({ pageParam }) =>
      getMainTagEvaluations(selectedTag?.id ?? 1, {
        cursor: pageParam,
      }),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.cursor ?? undefined
      },
      enabled: selectedTag !== undefined,
      suspense: false,
      retryDelay: 2000,
      retry: 5,
    },
  )

  return {
    searchResult,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
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
