import styled from "@emotion/styled"
import { Detail, Subheading01 } from "@lib/components/Text"
import { COLORS } from "@lib/styles/colors"
import { ReviewDetailDTO } from "@lib/dto/review"
import { Rating } from "@lib/components/Rating"
import { CollapsableText } from "@lib/components/CollapsableText"

interface Props {
  review: ReviewDetailDTO
}

export const ReviewCard = ({ review }: Props) => {
  return (
    <Wrapper>
      <Contents>
        <Header>
          <LectureName>{review.name}</LectureName>
          <SideInfo>
            <Rating rating={review.point} size={14} />
            <Semester>{review.semester} 수강</Semester>
          </SideInfo>
        </Header>
        <Review>
          <CollapsableText text={review.contents} />
        </Review>
      </Contents>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 20px 5px 20px;
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`

const LectureName = Subheading01

const Semester = styled(Detail)`
  color: ${COLORS.darkGray};
  text-align: right;
`

const SideInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const Review = styled.div``
