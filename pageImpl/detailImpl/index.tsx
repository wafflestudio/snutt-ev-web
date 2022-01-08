import styled from "@emotion/styled"
import { AppBar } from "@lib/components/Appbar"
import { useRouter } from "next/router"
import Image from "next/image"
import { Detail, Subheading02, Title01 } from "@lib/components/Text"
import { useLectureReviewContainer } from "./__containers__"
import { LectureReviewCard } from "./__components__/LectureReviewCard"

import arrow_back_icon from "@public/icons/arrow_back.svg"
import write_icon from "@public/icons/write.svg"
import star_small_filled from "@public/icons/star_small_filled.svg"
import { RatingGraph } from "@lib/components/RatingGraph"

export const DetailImpl = () => {
  const router = useRouter()

  const { reviewData } = useLectureReviewContainer()

  return (
    <Wrapper>
      <AppBar
        leftImageSrc={arrow_back_icon}
        leftImageOnClick={() => router.back()}
      >
        <AppBarContent>
          <Title01 style={{ marginLeft: 12 }}>강의평</Title01>
          <Image src={write_icon} alt={"write"} height={30} width={30} />
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
              <Image
                src={star_small_filled}
                alt={"star"}
                height={19}
                width={19}
              />
              <Title01 style={{ marginLeft: 6 }}>3.8</Title01>
            </ReviewScore>
            <ReviewCount>(n)개의 강의평</ReviewCount>
          </ReviewSummaryRight>
        </ReviewSummary>

        <ReviewDiagram>
          <DiagramTop>
            <AxisLabel style={{ marginBottom: 10 }}>성적 만족도</AxisLabel>
          </DiagramTop>
          <DiagramMiddle>
            <YAxisLabel>강의력</YAxisLabel>
            <GraphWrapper>
              <RatingGraph
                gradeSatisfaction={2}
                lifeBalance={4}
                gains={3}
                teachingSkill={3}
                height={280}
                width={280}
              />
            </GraphWrapper>
            <YAxisLabel>수라밸</YAxisLabel>
          </DiagramMiddle>
          <DiagramBottom>
            <AxisLabel>얻어가는 것</AxisLabel>
          </DiagramBottom>
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
  display: flex;
  flex-direction: column;
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
  height: 330px;
  width: 290px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  text-align: center;
  align-self: center;
  padding: 8px 0 8px 0;
`

const DiagramTop = styled.div``

const DiagramMiddle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
`

const DiagramBottom = styled.div`
  height: 28px;
`

const AxisLabel = styled.span`
  font-family: AppleSDGothicNeo;
  font-weight: bold;
  font-size: 10px;
  line-height: 11px;
`

const YAxisLabel = styled(AxisLabel)`
  margin-top: 20px;
`

const GraphWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const ReviewList = styled.div``
