import { MainEvaluationDTO } from '@/lib/dto/core/mainEvaluation';

export interface GetMainTagEvalutionsQuery {
  cursor?: string;
}

export interface GetMainTagEvaluationsResult {
  content: MainEvaluationDTO[];
  cursor?: string;
}
