import { useInfiniteQuery } from '@tanstack/react-query';

import { getMainTagEvaluations } from '@/lib/apis/ev';

export function useEvaluations(selectedTagId?: number) {
  return useInfiniteQuery(
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
}
