export interface EvaluationDTO {
  id: number
  lecture_id: number
  user_id: string
  content: string
  grade_satisfaction: number
  teaching_skill: number
  gains: number
  life_balance: number
  rating: number
  like_count: number
  dislike_count: number
  is_hidden: boolean
  is_reported: boolean
  year: number
  semester: number
  is_modifiable: boolean
}
