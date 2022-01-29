export interface LectureDTO {
  id: number
  classification: string
  department: string
  academic_year: string
  course_number: string
  title: string
  credit: number
  instructor: string
  category: string
  evaluation: {
    avg_rating: number
  }
}
