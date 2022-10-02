import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchLectureEvaluations } from '@/lib/apis/ev';

export function useLectureEvaluations(id: number) {
  return useInfiniteQuery(
    ['lectureEvaluation', id],
    async ({ pageParam }) => fetchLectureEvaluations({ params: { id }, query: { cursor: pageParam } }),
    {
      getNextPageParam: (lastPage) => lastPage.cursor ?? undefined,
      enabled: !isNaN(id),
      suspense: false,
      retryDelay: 2000,
      retry: 0,
    },
  );
}
