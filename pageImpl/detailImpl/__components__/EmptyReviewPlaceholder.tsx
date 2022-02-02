import styled from "@emotion/styled"
import { Subheading02, Title02 } from "@lib/components/Text"

export const EmptyReviewPlaceholder = () => {
  return (
    <Wrapper>
      <Title02 style={{ marginTop: "25vh" }}>느낌표 있는 고양이</Title02>
      <Subheading02 style={{ marginTop: 20 }}>
        아직 강의평이 없습니다.
      </Subheading02>
      <Subheading02 style={{ marginTop: 10 }}>
        가장 먼저 강의평을 남겨주세요!
      </Subheading02>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;

  text-align: center;
`
