import { useQuery } from "@tanstack/react-query";

import { fetchEvaluationSummary } from "@/lib/api/apis";
import { ApiError } from "@/lib/dto/core/error";
import { GetEvaluationSummaryResponse } from "@/lib/dto/getEvaluationSummary";

export function useEvaluationSummaryContainer(id: number) {
  const { data, error, isLoading } = useQuery<
    GetEvaluationSummaryResponse,
    ApiError
  >(["evaluationSummary", id], () => fetchEvaluationSummary(id), {
    enabled: !isNaN(id),
    retryDelay: 2000,
    retry: 4,
    suspense: false,
  });

  return {
    summaryData: data,
    error,
    isLoading,
  };
}
