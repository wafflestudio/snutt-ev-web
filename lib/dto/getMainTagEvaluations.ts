import { EvaluationDTO } from "./core/evaluation"

export interface GetMainTagEvalutionsQuery {
  cursor?: string
}

export interface GetMainTagEvaluationsResult {
  content: EvaluationDTO[]
  cursor?: string
}
