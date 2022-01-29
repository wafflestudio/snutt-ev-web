import { getLectures } from "@lib/api/apis"
import { TagDTO } from "@lib/dto/core/tag"
import { useInfiniteQuery } from "react-query"

export default function useSearchOptionContainer(
  selectedTags: TagDTO[],
  textQuery?: string,
) {
  const {
    data: searchResult,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["lectureSearch", textQuery, selectedTags],
    ({ pageParam }) =>
      getLectures({
        query: textQuery,
        tags: (selectedTags ?? []).map((it) => it.id),
        page: pageParam,
      }),
    {
      getNextPageParam: (lastPage, pages) => (lastPage.page ?? 0) + 1,
    },
  )
  return {
    searchResult,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  }
}
