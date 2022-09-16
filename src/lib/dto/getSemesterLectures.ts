import { SemesterLectureDTO } from "@/lib/dto/core/semesterLecture";

export interface GetSemesterLecturesResult {
  id: number;
  title: string;
  instructor: string;
  department: string;
  course_number: string;
  credit: number;
  academic_year: string;
  category: string;
  classification: string;
  semester_lectures: SemesterLectureDTO[];
}
