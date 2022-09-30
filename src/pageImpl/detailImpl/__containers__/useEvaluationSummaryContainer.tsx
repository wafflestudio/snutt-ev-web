import { useQuery } from '@tanstack/react-query';

import { fetchEvaluationSummary } from '@/lib/apis/ev';

export function useEvaluationSummaryContainer(id: number) {
  const { data, error, isLoading } = useQuery(
    ['evaluationSummary', id],
    () => fetchEvaluationSummary({ params: { id } }),
    {
      enabled: !isNaN(id),
      retryDelay: 2000,
      retry: 4,
      suspense: false,
    },
  );

  return {
    summaryData: data,
    error,
    isLoading,
  };
}
