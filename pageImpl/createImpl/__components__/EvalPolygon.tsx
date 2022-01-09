import styled from "@emotion/styled"
import { Title01 } from "@lib/components/Text"
import SvgTooltip from "@lib/components/Icons/SvgTooltip"
import { RatingGraph } from "@lib/components/RatingGraph"

export const EvalPolygon = () => {
  return (
    <Container>
      <Row>
        <Title01>점을 움직여 네가지 항목을 평가해주세요</Title01>
        <SvgTooltip width={30} height={30} />
      </Row>
      <GraphWrapper>
        <RatingGraph
          gradeSatisfaction={3}
          lifeBalance={5}
          gains={5}
          teachingSkill={5}
          height={300}
          width={300}
        />
      </GraphWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60vh;
  padding-top: 28px;
`

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const GraphWrapper = styled.div`
  height: 300px;
  width: 300px;
  position: relative;
`
