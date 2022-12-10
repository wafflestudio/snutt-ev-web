import { EvaluationDTO } from '@/dto/evaluation';
import { EvaluationSummaryDTO } from '@/dto/evaluationSummary';
import { LatestLectureDTO } from '@/dto/latestLecture';
import { LectureDTO } from '@/dto/lecture';
import { MainEvaluationDTO } from '@/dto/mainEvaluation';
import { SemesterLectureDTO } from '@/dto/semesterLecture';
import { TagGroupDTO, TagGroupWithColor } from '@/dto/tagGroup';
import { EvServiceUserDto } from '@/dto/user';

export type GetLatestLecturesResult = { content: LatestLectureDTO[]; total_count: number };
export type GetTagInfosProcessedResult = { tag_groups: TagGroupWithColor[] };
export type GetSemesterLecturesResult = {
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
};
export type PostEvaluationQuery = {
  content: string;
  grade_satisfaction: number;
  teaching_skill: number;
  gains: number;
  life_balance: number;
  rating: number;
};
export type PostEvaluationResult = {
  id: number;
  user: EvServiceUserDto;
  content: string;
  grade_satisfaction: number;
  teaching_skill: number;
  gains: number;
  life_balance: number;
  rating: number;
  like_count: number;
  is_liked: boolean;
  is_hidden: boolean;
  is_reported: boolean;
};
export type GetEvaluationSummaryResponse = EvaluationSummaryDTO;
export type PostReportEvaluationParams = { content: string };
export type PostReportEvaluationResult = {
  id: number;
  lecture_evaluation_id: number;
  user: EvServiceUserDto;
  content: string;
  is_hidden: boolean;
};
export type DeleteEvaluationResult = unknown;
export type GetEvaluationsQuery = { cursor: string };
export type GetEvaluationsResult = {
  content: EvaluationDTO[];
  cursor: string | null;
  size: number;
  last: boolean;
  total_count: number;
};
export type GetMyLectureEvaluationsResult = { evaluations: EvaluationDTO[] };
export type GetLecturesQuery = { query?: string; tags: number[]; page: number };
export type GetLecturesResult = { content: LectureDTO[]; page?: number; size: number; last: boolean };
export type GetMainTagEvalutionsQuery = { cursor?: string };
export type GetMainTagEvaluationsResult = { content: MainEvaluationDTO[]; cursor: string | null };
export type GetMainTagInfosResult = TagGroupDTO;
export type ListMyEvaluationsResponse = {
  content: MainEvaluationDTO[];
  cursor: string | null;
  size: number;
  last: boolean;
  total_count: number;
};
