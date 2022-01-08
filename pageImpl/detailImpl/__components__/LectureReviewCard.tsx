import styled from "@emotion/styled"
import { Detail, Subheading01 } from "@lib/components/Text"
import { COLORS } from "@lib/styles/colors"
import { ReviewDetailDTO } from "@lib/dto/review"
import { Rating } from "@lib/components/Rating"
import { useState } from "react"

interface Props {
  review: ReviewDetailDTO
}

export const LectureReviewCard = ({ review }: Props) => {
  const [expanded, setExpanded] = useState(false)
  const truncBy = 120

  const text =
    review.contents.length > truncBy && expanded
      ? review.contents.slice(0, truncBy) + "..."
      : review.contents

  return (
    <Wrapper>
      <Contents>
        <Header>
          <Rating rating={review.point} size={14} />
          <SideInfo>
            <Semester>{review.semester} 수강</Semester>
          </SideInfo>
        </Header>
        <Review>
          <Detail>
            {text}
            {review.contents.length > truncBy && (
              <MoreLessButton onClick={() => setExpanded((status) => !status)}>
                {" "}
                {expanded ? "더보기" : "접기"}
              </MoreLessButton>
            )}
          </Detail>
        </Review>
      </Contents>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 0 5px 0;
  box-sizing: border-box;
`

const Contents = styled.div`
  border-bottom: 1px solid ${COLORS.gray};
  height: 100%;
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

const Semester = styled(Detail)`
  color: ${COLORS.darkGray};
  text-align: right;
`

const SideInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const Review = styled.div`
  display: inline-block;
  width: 100%;
`

const MoreLessButton = styled.a`
  color: rgb(179, 179, 179);
`
