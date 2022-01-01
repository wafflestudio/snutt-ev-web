import styled from "@emotion/styled"
import { ReviewCard } from "./__components__/ReviewCard"
import { useMainReviewContainer } from "./__containers__"
import { Subheading02 } from "@lib/components/Text"

export const MainImpl = () => {
  const { data } = useMainReviewContainer()

  return (
    <Wrapper>
      {data ? (
        data.map((it) => <ReviewCard review={it} key={it.id} />)
      ) : (
        <Subheading02>데이터 로딩 OR 에러</Subheading02>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div``
