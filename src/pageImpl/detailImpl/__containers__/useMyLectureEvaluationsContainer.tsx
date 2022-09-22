import { useQuery } from '@tanstack/react-query';

import { fetchMyLectureEvaluations } from '@/lib/api/apis';
import { GetMyEvaluationsResult } from '@/lib/dto/getEvaluations';

export function useMyLectureEvaluationsContainer(id: number) {
  const { data: myReviewResult } = useQuery<GetMyEvaluationsResult>(
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
