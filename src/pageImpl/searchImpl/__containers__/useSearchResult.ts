import { useInfiniteQuery } from '@tanstack/react-query';

import { getLectures } from '@/lib/api/apis';

export const useSearchResult = (
  selectedTagIDs: number[],
  textQuery?: string,
) => {
  const {
    data: searchResult,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['lectureSearch', textQuery, selectedTagIDs],
    ({ pageParam }) =>
      getLectures({
        query: textQuery,
        tags: selectedTagIDs,
        page: pageParam,
      }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.last) {
          return undefined;
        }
        return (lastPage.page ?? 0) + 1;
      },
      retryDelay: 2000,
      retry: 5,
      suspense: false,
    },
  );
  return {
    searchResult,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
};
