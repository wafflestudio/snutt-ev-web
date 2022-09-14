import { fetchEvaluationSummary } from "@/lib/api/apis"
import { useQuery } from "react-query"
import { GetEvaluationSummaryResponse } from "@/lib/dto/getEvaluationSummary"
import { ApiError } from "@/lib/dto/core/error"

export function useEvaluationSummaryContainer(id: number) {
  const { data, error, isLoading } = useQuery<
    GetEvaluationSummaryResponse,
    ApiError
  >(["evaluationSummary", id], () => fetchEvaluationSummary(id), {
    enabled: !isNaN(id),
    retryDelay: 2000,
    retry: 4,
    suspense: false,
  })

  return {
    summaryData: data,
    error,
    isLoading,
  }
}
