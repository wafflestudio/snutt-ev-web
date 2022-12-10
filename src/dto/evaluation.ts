import { Semester } from './semester';
import { EvServiceUserDto } from './user';

export interface EvaluationDTO {
  id: number;
  lecture_id: number;
  user: EvServiceUserDto;
  content: string;
  grade_satisfaction: number | null;
  teaching_skill: number | null;
  gains: number | null;
  life_balance: number | null;
  rating: number;
  like_count: number;
  is_liked: boolean;
  is_hidden: boolean;
  is_reportable: boolean;
  year: number;
  semester: Semester;
  is_modifiable: boolean;
  from_snuev: boolean;
}
