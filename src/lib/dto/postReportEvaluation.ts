export interface PostReportEvaluationParams {
  content: string;
}

export interface PostReportEvaluationResult {
  id: number;
  lecture_evaluation_id: number;
  user_id: string;
  content: string;
  is_hidden: boolean;
}
