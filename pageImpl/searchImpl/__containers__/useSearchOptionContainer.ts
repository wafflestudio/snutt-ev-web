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
        tags: selectedTags ?? [],
        page: pageParam,
      }),
    {
      getNextPageParam: (lastPage, pages) => lastPage.next_page,
    },
  )
  return {
    searchResult,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  }
}
