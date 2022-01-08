import styled from "@emotion/styled"
import { AppBar } from "@lib/components/Appbar"
import { useRouter } from "next/router"
import { Detail, Subheading02, Title01 } from "@lib/components/Text"

import { useLectureReviewContainer } from "./__containers__"
import { LectureReviewCard } from "./__components__/LectureReviewCard"
import SvgWrite from "@lib/components/Icons/SvgWrite"
import SvgStarSmallFilled from "@lib/components/Icons/SvgStarSmallFilled"
import SvgArrowBack from "@lib/components/Icons/SvgArrowBack"

export const DetailImpl = () => {
  const router = useRouter()

  const { reviewData } = useLectureReviewContainer()

  return (
    <Wrapper>
      <AppBar
        LeftImage={() => (
          <SvgArrowBack width={30} height={30} onClick={() => router.back()} />
        )}
      >
        <AppBarContent>
          <Title01 style={{ marginLeft: 12 }}>강의평</Title01>
          <SvgWrite height={30} width={30} />
        </AppBarContent>
      </AppBar>

      <Content>
        <ReviewSummary>
          <ReviewSummaryLeft>
            <Title01>(강의명)</Title01>
            <InstructorName>(교수명)</InstructorName>
          </ReviewSummaryLeft>
          <ReviewSummaryRight>
            <ReviewScore>
              <SvgStarSmallFilled height={19} width={19} />
              <Title01 style={{ marginLeft: 6, marginTop: 0 }}>3.8</Title01>
            </ReviewScore>
            <ReviewCount>(n)개의 강의평</ReviewCount>
          </ReviewSummaryRight>
        </ReviewSummary>

        <ReviewDiagram>
          <Title01>다이어그램</Title01>
        </ReviewDiagram>

        <ReviewList>
          {reviewData ? (
            reviewData.map((it) => (
              <LectureReviewCard review={it} key={it.id} />
            ))
          ) : (
            <Subheading02>대충 아직 없으니 적어달라는 문구</Subheading02>
          )}
        </ReviewList>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const AppBarContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 12px;
`

const Content = styled.div`
  padding: 0 20px 0 20px;
`

const ReviewSummary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 12px 0 12px 0;
  border-bottom: solid 1px rgb(232, 232, 232);
`

const ReviewSummaryLeft = styled.div`
  display: flex;
  flex-direction: column;
`

const InstructorName = styled(Subheading02)`
  margin-top: 3px;
  color: rgb(119, 119, 119);
`

const ReviewSummaryRight = styled.div`
  display: flex;
  flex-direction: column;
`

const ReviewScore = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
`

const ReviewCount = styled(Detail)`
  margin-top: 3px;
  color: rgb(102, 102, 102);
`

const ReviewDiagram = styled.div`
  height: 230px;

  display: flex;
  justify-content: center;
  align-content: center;

  padding: 8px 0 8px 0;
`

const ReviewList = styled.div``
