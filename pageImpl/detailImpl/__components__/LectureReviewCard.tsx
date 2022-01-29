import styled from "@emotion/styled"
import { Detail, Subheading01 } from "@lib/components/Text"
import { COLORS } from "@lib/styles/colors"
import { ReviewDetailDTO } from "@lib/dto/review"
import { Rating } from "@lib/components/Rating"
import { useState } from "react"
import { CollapsableText } from "@lib/components/CollapsableText"
import { EvaluationDTO } from "@lib/dto/core/evaluation"
import MoreVerticalIcon from "../../../public/icons/more_vertical.svg"
import { css } from "@emotion/react"

interface Props {
  review: EvaluationDTO
  onMoreClick: () => void
  isMyReivew?: boolean
}

export const LectureReviewCard = ({
  review,
  onMoreClick,
  isMyReivew = false,
}: Props) => {
  return (
    <Wrapper isMintColor={isMyReivew}>
      <Contents>
        <Header>
          <SideInfo>
            <Rating rating={review.rating} size={12} />
            <Semester>
              {review.year}-{review.semester} 수강
            </Semester>
            <div style={{ flexGrow: 1 }} />
            <div onClick={onMoreClick}>
              <MoreVerticalIcon />
            </div>
          </SideInfo>
        </Header>
        <Review>
          <CollapsableText text={review.content} />
        </Review>
      </Contents>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ isMintColor: boolean }>`
  width: calc(100% + 40px);
  padding: 20px 20px 5px 20px;
  box-sizing: border-box;
  margin-left: -20px;
  background-color: ${(props) =>
    props.isMintColor && "rgba(27, 208, 200, 0.05)"};
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
  text-align: left;
  font-size: 10px;
  margin-left: 8px;
`

const SideInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const Review = styled.div`
  display: inline-block;
  width: 100%;
`
