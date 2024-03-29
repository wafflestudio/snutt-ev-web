import { useInfiniteQuery } from '@tanstack/react-query';

import { listMyEvaluations } from '@/apis/ev';

export const useMyEvaluations = () =>
  useInfiniteQuery(
    ['evaluations', 'list', 'my'],
    async ({ pageParam }) => listMyEvaluations({ query: { cursor: pageParam } }),
    { getNextPageParam: (lastPage) => lastPage.cursor ?? undefined },
  );
