import styled from "@emotion/styled"
import { Detail, Title02 } from "@/lib/components/Text"
import { resetMarPad } from "@/lib/styles"
import SvgStarSmallEmpty from "@/lib/components/Icons/SvgStarSmallEmpty"
import SvgStarSmallFilled from "@/lib/components/Icons/SvgStarSmallFilled"
import { COLORS } from "@/lib/styles/colors"
import SvgWarning from "@/lib/components/Icons/SvgWarning"

interface Props {
  handleRating: (rating: number) => void
  rating: number
  content: string
  handleContent: (content: string) => void
  contentsUnsatisfied: boolean
}

export const EvalBasic = ({
  handleRating,
  rating,
  handleContent,
  content,
  contentsUnsatisfied,
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

  const WARNING = {
    unsatisfiedContents: "강의평을 30자 이상 남겨주세요",
  }

  return (
    <>
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
      {contentsUnsatisfied && (
        <WarningContainer>
          <SvgWarning
            color={COLORS.red}
            width={15}
            height={15}
            style={{ marginRight: "2px", marginTop: "2px" }}
          />
          <Detail style={{ color: COLORS.red }}>
            {WARNING.unsatisfiedContents}
          </Detail>
        </WarningContainer>
      )}
    </>
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

const WarningContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 2px;
`
