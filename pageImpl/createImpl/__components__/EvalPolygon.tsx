import styled from "@emotion/styled"
import { Title01 } from "@lib/components/Text"
import SvgTooltip from "@lib/components/Icons/SvgTooltip"
import { RatingGraph } from "@lib/components/RatingGraph"
import { SliderUnstyled } from "@mui/material"
import { useState } from "react"

export const EvalPolygon = () => {
  const defaultRight = 3
  const [right, setRight] = useState(defaultRight)
  const handleSliderRight = (
    e: TouchEvent,
    newValue: number,
    activeThumb: number,
  ) => {
    if (newValue < 1) {
      setRight(1)
    } else {
      setRight(newValue)
    }
  }

  const defaultLeft = 3
  const [left, setLeft] = useState(defaultLeft)
  const handleSliderLeft = (
    e: TouchEvent,
    newValue: number,
    activeThumb: number,
  ) => {
    const realValue = 5 - newValue
    if (realValue < 1) {
      setLeft(1)
    } else {
      setLeft(realValue)
    }
  }

  const defaultTop = 3
  const [top, setTop] = useState(defaultTop)
  const handleSliderTop = (
    e: TouchEvent,
    newValue: number,
    activeThumb: number,
  ) => {
    if (newValue < 1) {
      setTop(1)
    } else {
      setTop(newValue)
    }
  }

  const defaultBottom = 3
  const [bottom, setBottom] = useState(defaultBottom)
  const handleSliderBottom = (
    e: TouchEvent,
    newValue: number,
    activeThumb: number,
  ) => {
    const realValue = 5 - newValue
    if (realValue < 1) {
      setBottom(1)
    } else {
      setBottom(realValue)
    }
  }

  return (
    <Container>
      <Row>
        <Title01>점을 움직여 네가지 항목을 평가해주세요</Title01>
        <SvgTooltip width={30} height={30} />
      </Row>
      <GraphWrapper>
        <RatingGraph
          gradeSatisfaction={top}
          lifeBalance={right}
          gains={bottom}
          teachingSkill={left}
          height={300}
          width={300}
        />
        <CustomSliderRight
          marks
          min={0}
          max={5}
          step={1}
          defaultValue={defaultRight}
          valueLabelDisplay={"off"}
          value={right}
          onChange={handleSliderRight}
        />
        <CustomSliderTop
          marks
          min={0}
          max={5}
          step={1}
          defaultValue={defaultTop}
          valueLabelDisplay={"off"}
          value={top}
          onChange={handleSliderTop}
          orientation={"vertical"}
        />
        <CustomSliderLeft
          dir="rtl"
          marks
          min={0}
          max={5}
          step={1}
          defaultValue={defaultTop}
          valueLabelDisplay={"off"}
          value={5 - left}
          onChange={handleSliderLeft}
        />
        <CustomSliderBottom
          marks
          min={0}
          max={5}
          step={1}
          defaultValue={defaultBottom}
          valueLabelDisplay={"off"}
          value={5 - bottom}
          onChange={handleSliderBottom}
          orientation={"vertical"}
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

const CustomSlider = styled(SliderUnstyled)`
  display: inline-block;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;

  & .MuiSlider-rail {
    display: block;
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: rgb(256, 256, 256, 0);
  }

  & .MuiSlider-track {
    display: block;
    position: absolute;
    height: 4px;
    border-radius: 2px;
    background-color: rgb(256, 256, 256, 0);
  }

  & .MuiSlider-thumb {
    position: absolute;
    width: 18px;
    height: 18px;
    margin-left: -7px;
    margin-top: -7px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    border: 2px solid #1ac5bd;
    background-color: #fff;
  }
`

const CustomSliderVertical = styled(CustomSlider)`
  height: 150px;
  width: 4px;
  padding: 0px 13px;
`

const CustomSliderHorizontal = styled(CustomSlider)`
  height: 4px;
  width: 150px;
  padding: 13px 0;
`

const CustomSliderRight = styled(CustomSliderHorizontal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(0, -50%);
`

const CustomSliderLeft = styled(CustomSliderHorizontal)`
  position: absolute;
  top: 50%;
  left: 0%;
  transform: translate(0, -50%);
`

const CustomSliderTop = styled(CustomSliderVertical)`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 10px);
`

const CustomSliderBottom = styled(CustomSliderVertical)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 8px);
`
