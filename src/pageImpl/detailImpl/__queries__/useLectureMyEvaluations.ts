import { useQuery } from '@tanstack/react-query';

import { fetchMyLectureEvaluations } from '@/lib/apis/ev';

export function useLectureMyEvaluations(id: number) {
  return useQuery(
    ['myLectureEvaluation', id] as const,
    async ({ queryKey: [, id] }) => fetchMyLectureEvaluations({ params: { id } }),
    { enabled: !isNaN(id), suspense: false, retryDelay: 2000, retry: 0 },
  );
}
