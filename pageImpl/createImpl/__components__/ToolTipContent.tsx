import { Title01, Title02 } from "@lib/components/Text"
import { Fragment } from "react"
import styled from "@emotion/styled"

export const TootTipContent = () => {
  return (
    <Wrapper>
      <Title01>성적만족도</Title01>
      <Title02 style={{ marginBottom: 10 }}>
        이번 강의 성적에 만족하셨나요?
      </Title02>
      <Title01>강의력</Title01>
      <Title02 style={{ marginBottom: 10 }}>
        교수님의 강의력은 좋았나요?
      </Title02>
      <Title01>수라밸</Title01>
      <Title02 style={{ marginBottom: 10 }}>
        수업과 라이프의 밸런스는 맞았나요?
      </Title02>
      <Title01>얻어가는 것</Title01>
      <Title02>강의를 통해 배움을 얻으셨나요?</Title02>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 16px;
  padding: 24px;
`
