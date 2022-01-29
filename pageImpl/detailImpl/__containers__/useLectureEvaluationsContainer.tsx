import { useInfiniteQuery, useQuery } from "react-query"
import {
  GetEvaluationsQuery,
  GetEvaluationsResult,
} from "@lib/dto/getEvaluations"
import { ApiError } from "@lib/dto/core/error"
import { fetchLectureEvaluations } from "@lib/api/apis"
import { useState } from "react"

export function useLectureEvaluationsContainer(id: number) {
  // const [totalCount, setTotalCount] = useState<number>(0)
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
      // setTotalCount(data.total_count)
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
    totalCount: 0,
    searchResult,
    fetchNextPage,
  }
}
