import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchLectureEvaluations } from '@/lib/apis/ev';

export function useLectureEvaluationsContainer(id: number) {
  const {
    data: searchResult,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['lectureEvaluation', id],
    async ({ pageParam }) => {
      const data = await fetchLectureEvaluations({
        params: { id },
        query: { cursor: pageParam },
      });
      return data;
    },
    {
      getNextPageParam: (lastPage) => lastPage.cursor ?? undefined,
      enabled: !isNaN(id),
      suspense: false,
      retryDelay: 2000,
      retry: 0,
    },
  );

  return {
    searchResult,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
}
