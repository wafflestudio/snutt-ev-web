import { useInfiniteQuery } from "react-query"
import { fetchLectureEvaluations } from "@/lib/api/apis"

export function useLectureEvaluationsContainer(id: number) {
  const {
    data: searchResult,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["lectureEvaluation", id],
    async ({ pageParam }) => {
      const data = await fetchLectureEvaluations(id, {
        cursor: pageParam,
      })
      return data
    },
    {
      getNextPageParam: (lastPage, pages) => lastPage.cursor ?? undefined,
      enabled: !isNaN(id),
      suspense: false,
      retryDelay: 2000,
      retry: 0,
    },
  )

  return {
    searchResult,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  }
}
