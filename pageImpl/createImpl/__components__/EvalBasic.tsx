import styled from "@emotion/styled"
import { Title02 } from "@lib/components/Text"

interface Props {
  stepPrev: () => void
}

export const EvalBasic = ({ stepPrev }: Props) => {
  return (
    <Container>
      <Title02>별점</Title02>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 408px;
  padding-top: 28px;
`
