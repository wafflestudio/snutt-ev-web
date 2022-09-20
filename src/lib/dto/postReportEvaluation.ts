import { EvServiceUserDto } from './core/user';

export interface PostReportEvaluationParams {
  content: string;
}

export interface PostReportEvaluationResult {
  id: number;
  lecture_evaluation_id: number;
  user: EvServiceUserDto;
  content: string;
  is_hidden: boolean;
}
