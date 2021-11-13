export interface ReviewDTO {
  id: string
  name: string
  point: number
}

export interface ReviewDetailDTO extends ReviewDTO {
  semester: string
  contents: string
}
