import { EvaluationDTO } from "@lib/dto/core/evaluation"

export interface GetEvaluationsQuery {
  cursor: string
}

export interface GetEvaluationsResult {
  content: EvaluationDTO[]
  cursor: string
  size: number
  last: boolean
  total_count: number
}
