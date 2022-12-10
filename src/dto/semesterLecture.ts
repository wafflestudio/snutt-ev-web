import { Semester } from './semester';

export interface SemesterLectureDTO {
  id: number;
  year: number;
  semester: Semester;
  credit: number;
  extra_info: string;
  academic_year: string;
  category: string;
  classification: string;
}
