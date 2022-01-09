import styled from "@emotion/styled"
import { Title01 } from "@lib/components/Text"
import polygon from "@public/images/polygon.svg"
import SvgTooltip from "@lib/components/Icons/SvgTooltip"

export const EvalPolygon = () => {
  return (
    <Container>
      <Row>
        <Title01>점을 움직여 네가지 항목을 평가해주세요</Title01>
        <SvgTooltip width={30} height={30} />
      </Row>
      {/* TODO: 일단 모양만 넣어둔 것 */}
      <img src={polygon} width="300px" height="300px" alt="polygon" />
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

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
