import { Semester } from './semester';

export interface MainEvaluationDTO {
  id: number;
  content: string;
  grade_satisfaction: number;
  teaching_skill: number;
  gains: number;
  life_balance: number;
  rating: number;
  like_count: number;
  dislike_count: number;
  is_hidden: boolean;
  year: number;
  semester: Semester;
  lecture: {
    id: number;
    title: string;
    instructor: string;
  };
  is_modifiable: boolean;
  is_reportable: boolean;
}
