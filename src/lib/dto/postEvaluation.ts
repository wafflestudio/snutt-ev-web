import { EvServiceUserDto } from './core/user';

export interface PostEvaluationQuery {
  content: string;
  grade_satisfaction: number;
  teaching_skill: number;
  gains: number;
  life_balance: number;
  rating: number;
}

export interface PostEvaluationResult {
  id: number;
  user: EvServiceUserDto;
  content: string;
  grade_satisfaction: number;
  teaching_skill: number;
  gains: number;
  life_balance: number;
  rating: number;
  like_count: number;
  dislike_count: number;
  is_hidden: boolean;
  is_reported: boolean;
}
