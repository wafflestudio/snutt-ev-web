import { useInfiniteQuery } from '@tanstack/react-query';

import { getMainTagEvaluations } from '@/lib/api/apis';

export function useEvaluations(selectedTagId?: number) {
  const {
    data: searchResult,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['tagEvaluations', selectedTagId],
    ({ pageParam }) =>
      getMainTagEvaluations({
        params: { id: selectedTagId ?? 1 },
        query: { cursor: pageParam },
      }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.cursor ?? undefined;
      },
      enabled: selectedTagId !== undefined,
      suspense: false,
      retryDelay: 2000,
      retry: 5,
    },
  );

  return {
    searchResult,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
}
