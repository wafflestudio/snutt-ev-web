import styled from "@emotion/styled"
import { Detail, Subheading01 } from "@lib/components/Text"
import { COLORS } from "@lib/styles/colors"
import { Rating } from "@lib/components/Rating"
import { CollapsableText } from "@lib/components/CollapsableText"
import { EvaluationDTO } from "@lib/dto/core/evaluation"

interface Props {
  evaluation: EvaluationDTO
}

export const EvaluationCard = ({ evaluation }: Props) => {
  return (
    <Wrapper>
      <Contents>
        <Header>
          <LectureName>{evaluation.lecture_id}</LectureName>
          <RatingInfo>
            <Rating rating={evaluation.rating} size={12} />
            <Semester>
              {evaluation.year}-{evaluation.semester} 수강
            </Semester>
          </RatingInfo>
        </Header>
        <Review>
          <CollapsableText text={evaluation.content} />
        </Review>
      </Contents>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 20px 0px 20px;
  box-sizing: border-box;
`

const Contents = styled.div`
  border-bottom: 1px solid ${COLORS.gray};
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
`

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  margin-bottom: 12px;
`

const LectureName = Subheading01

const Semester = styled(Detail)`
  color: ${COLORS.darkGray};
  text-align: left;
  font-size: 11px;
  margin-left: 8px;
  line-height: 100%;
`

const RatingInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 3px;
  align-items: center;
`

const Review = styled.div``
