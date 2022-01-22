import styled from "@emotion/styled"
import { Title02 } from "@lib/components/Text"
import { resetMarPad } from "@lib/styles"
import SvgStarSmallEmpty from "@lib/components/Icons/SvgStarSmallEmpty"
import SvgStarSmallFilled from "@lib/components/Icons/SvgStarSmallFilled"

interface Props {
  stepPrev: () => void
  handleRating: (rating: number) => void
  rating: number
  content: string
  handleContent: (content: string) => void
}

export const EvalBasic = ({
  stepPrev,
  handleRating,
  rating,
  handleContent,
  content,
}: Props) => {
  const ratingImage = {
    empty: <SvgStarSmallEmpty width={30} height={30} />,
    filled: <SvgStarSmallFilled width={30} height={30} />,
  }

  const ratings = [
    {
      empty: ratingImage.empty,
      filled: ratingImage.filled,
    },
    {
      empty: ratingImage.empty,
      filled: ratingImage.filled,
    },
    {
      empty: ratingImage.empty,
      filled: ratingImage.filled,
    },
    {
      empty: ratingImage.empty,
      filled: ratingImage.filled,
    },
    {
      empty: ratingImage.empty,
      filled: ratingImage.filled,
    },
  ]

  const placeHolder =
    "강의에 대한 솔직한 리뷰를 남겨주세요. \nex) 과제, 출석, 교수님, 시험 난이도, 팀플 유무 등"

  return (
    <Container>
      <Title02>별점</Title02>
      <SubTitle>수업에 대한 별점을 남겨주세요.</SubTitle>
      <RatingContainer>
        {ratings.map((star, index) => (
          <RatingButton key={index} onClick={() => handleRating(index)}>
            {rating < index ? star.empty : star.filled}
          </RatingButton>
        ))}
      </RatingContainer>
      <ContentTextarea
        value={content}
        onChange={(e) => handleContent(e.target.value)}
        placeholder={placeHolder}
      />
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
  margin-bottom: 24px;
`

const RatingButton = styled.button`
  background-color: transparent;
  border: none;
`

const ContentTextarea = styled.textarea`
  width: 100%;
  height: 400px;
  background-color: #f9f9f9;
  border: 1px solid rgba(98, 98, 98, 0.5);
  box-sizing: border-box;
  border-radius: 12px;
  font-family: AppleSDGothicNeo;
  font-size: 14px;
  line-height: 19px;
  padding: 12px;
  overflow-y: scroll;
  color: #777777;
  outline: none;
`
