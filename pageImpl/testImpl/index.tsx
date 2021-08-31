import React from "react"
import styled from "@emotion/styled"
import { HeaderTap } from "./__components__/HeaderTap"
import { useContainer } from "./__containers__"
import { ReviewItem } from "./__components__/ReviewItem"

export const TestImpl = () => {
  const { data, setSelectedTap, selectedTap } = useContainer()

  return (
    <Wrapper>
      <Title>Test Impl </Title>
      <HeaderTap selectedTap={selectedTap} setSelection={setSelectedTap} />
      <ReviewList>
        {data ? (
          data.map((it) => <ReviewItem content={it} key={it.id} />)
        ) : (
          <ReviewOnLoading>로딩 중</ReviewOnLoading>
        )}
      </ReviewList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-size: 20px;
  color: aqua;
`

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
`

const ReviewOnLoading = styled.div``
