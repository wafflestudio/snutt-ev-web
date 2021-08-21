import styled from "@emotion/styled"
import { ReviewDTO } from "@lib/dto/review"
import React from "react"

interface Props {
  content: ReviewDTO
}

export const ReviewItem: React.FC<Props> = ({ content }) => {
  return (
    <Wrapper>
      <ItemRow>리뷰이름 {content.name}</ItemRow>
      <ItemRow>리뷰점수 {content.point}</ItemRow>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const ItemRow = styled.div`
  font-size: 24px;
`
