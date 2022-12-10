import { useQuery } from '@tanstack/react-query';

import { fetchEvaluationSummary } from '@/apis/ev';

export function useEvaluationSummary(id: number) {
  return useQuery(
    ['evaluationSummary', id] as const,
    ({ queryKey: [, id] }) => fetchEvaluationSummary({ params: { id } }),
    { enabled: !isNaN(id), retryDelay: 2000, retry: 4, suspense: false },
  );
}
