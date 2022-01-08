import Image from "next/image"
import styled from "@emotion/styled"
import { Title02 } from "@lib/components/Text"
import { resetMarPad } from "@lib/styles"
import starEmpty from "@public/icons/star_small_empty.svg"
import starFilled from "@public/icons/star_small_filled.svg"

interface Props {
  stepPrev: () => void
  handleRating: (rating: number) => void
  rating: number
}

export const EvalBasic = ({ stepPrev, handleRating, rating }: Props) => {
  const ratingImage = {
    empty: (
      <Image src={starEmpty} width="30px" height="30px" alt="empty star" />
    ),
    fiiled: (
      <Image src={starFilled} width="30px" height="30px" alt="filled star" />
    ),
  }

  const ratings = [
    {
      empty: ratingImage.empty,
      fiiled: ratingImage.fiiled,
    },
    {
      empty: ratingImage.empty,
      fiiled: ratingImage.fiiled,
    },
    {
      empty: ratingImage.empty,
      fiiled: ratingImage.fiiled,
    },
    {
      empty: ratingImage.empty,
      fiiled: ratingImage.fiiled,
    },
    {
      empty: ratingImage.empty,
      fiiled: ratingImage.fiiled,
    },
  ]

  return (
    <Container>
      <Title02>별점</Title02>
      <SubTitle>수업에 대한 별점을 남겨주세요.</SubTitle>
      <RatingContainer>
        {ratings.map((star, index) => (
          <RatingButton key={index} onClick={() => handleRating(index)}>
            {rating < index ? star.empty : star.fiiled}
          </RatingButton>
        ))}
      </RatingContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 408px;
  padding-top: 28px;
`

const SubTitle = styled.p`
  ${resetMarPad}
  font-family: AppleSDGothicNeo;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 12px;
  color: #b3b3b3;
  margin-top: 7px;
`

const RatingContainer = styled.div`
  display: flex;
  margin-top: 4px;
`

const RatingButton = styled.button`
  background-color: transparent;
  border: none;
`
