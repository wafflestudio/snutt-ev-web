import { useQuery } from '@tanstack/react-query';

import { fetchMyLectureEvaluations } from '@/lib/apis/ev';

export function useMyLectureEvaluationsContainer(id: number) {
  const { data: myReviewResult } = useQuery(
    ['myLectureEvaluation', id],
    async () => {
      const data = await fetchMyLectureEvaluations({ params: { id } });
      return data;
    },
    {
      enabled: !isNaN(id),
      suspense: false,
      retryDelay: 2000,
      retry: 0,
    },
  );

  return {
    myReviewResult,
  };
}
