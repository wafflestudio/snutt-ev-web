import styled from "@emotion/styled"
import { ReviewCard } from "./__components__/ReviewCard"
import {
  useMainRecentContainer,
  useMainReviewContainer,
} from "./__containers__"
import { Subheading02 } from "@lib/components/Text"
import { RecentCarousel } from "./__components__/RecentCarousel"

export const MainImpl = () => {
  const { curationData } = useMainReviewContainer()
  const { recentLectureData } = useMainRecentContainer()

  return (
    <Wrapper>
      {recentLectureData ? (
        <RecentCarousel lectureList={recentLectureData} />
      ) : (
        <Subheading02>데이터 로딩 OR 에러</Subheading02>
      )}

      {curationData ? (
        curationData.map((it) => <ReviewCard review={it} key={it.id} />)
      ) : (
        <Subheading02>데이터 로딩 OR 에러</Subheading02>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div``
