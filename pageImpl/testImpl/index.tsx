import React from "react"
import styled from "@emotion/styled"
import { HeaderTap } from "./__components__/HeaderTap"
import { useContainer } from "./__containers__"
import { ReviewItem } from "./__components__/ReviewItem"
import {
  Title01,
  Title02,
  Subheading01,
  Subheading02,
  Tag,
  Detail,
  DetailHighlight,
} from "@lib/components/Text"

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
      <Title01>Title 01</Title01>
      <Title02>Title 02</Title02>
      <Subheading01>Subheading 01</Subheading01>
      <Subheading02>Subheading 02</Subheading02>
      <Tag>Tag</Tag>
      <Detail>Detail</Detail>
      <DetailHighlight>DetailHighlight</DetailHighlight>
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
