import { useQuery } from "react-query"
import {
  GetEvaluationsQuery,
  GetEvaluationsResult,
} from "@lib/dto/getEvaluations"
import { ApiError } from "@lib/dto/core/error"
import { fetchLectureEvaluations } from "@lib/api/apis"

export function useLectureEvaluationsContainer(query: GetEvaluationsQuery) {
  const { data, error, isLoading } = useQuery<GetEvaluationsResult, ApiError>(
    ["lectureEvaluation", query],
    () => fetchLectureEvaluations(query),
  )

  return {
    evaluationData: data,
    error,
    isLoading,
  }
}
