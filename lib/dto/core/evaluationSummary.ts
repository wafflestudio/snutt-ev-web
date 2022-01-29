export interface EvaluationSummaryDTO {
  id: number
  title: string
  instructor: string
  department: string
  course_number: string
  credit: number
  academic_year: string
  category: string
  classification: string
  summary: SummaryDTO
}

export interface SummaryDTO {
  avg_grade_satisfaction: number
  avg_teaching_skill: number
  avg_gains: number
  avg_life_balance: number
  avg_rating: number
}
