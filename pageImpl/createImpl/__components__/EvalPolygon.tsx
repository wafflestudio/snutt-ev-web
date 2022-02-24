import styled from "@emotion/styled"
import { DetailHighlight, Title01 } from "@lib/components/Text"
import SvgTooltip from "@lib/components/Icons/SvgTooltip"
import { RatingGraph } from "@lib/components/RatingGraph"
import { SliderUnstyled, Tooltip, ClickAwayListener } from "@mui/material"
import { useState } from "react"
import { TootTipContent } from "./ToolTipContent"
import { RatingTooltip } from "@lib/components/Tooltip"

interface Props {
  defaultValue: number
  score: {
    top: number
    left: number
    right: number
    bottom: number
  }
  handleUpdateScore: (
    value: number,
    direction: "top" | "left" | "bottom" | "right",
  ) => void
}

export const EvalPolygon = ({
  defaultValue,
  score,
  handleUpdateScore,
}: Props) => {
  const { top, left, bottom, right } = score

  return (
    <Container>
      <Row>
        <Title01>점을 움직여 네가지 항목을 평가해주세요</Title01>
        <RatingTooltip />
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
          defaultValue={defaultValue}
          valueLabelDisplay={"off"}
          value={right}
          onChange={(e, newValue) =>
            handleUpdateScore(newValue as number, "right")
          }
        />
        <CustomSliderTop
          marks
          min={0}
          max={5}
          step={1}
          defaultValue={defaultValue}
          valueLabelDisplay={"off"}
          value={top}
          onChange={(e, newValue) =>
            handleUpdateScore(newValue as number, "top")
          }
          orientation={"vertical"}
        />
        <CustomSliderLeft
          dir="rtl"
          marks
          min={0}
          max={5}
          step={1}
          defaultValue={defaultValue}
          valueLabelDisplay={"off"}
          value={5 - left}
          onChange={(e, newValue) => {
            handleUpdateScore(5 - (newValue as number), "left")
          }}
        />
        <CustomSliderBottom
          marks
          min={0}
          max={5}
          step={1}
          defaultValue={defaultValue}
          valueLabelDisplay={"off"}
          value={5 - bottom}
          onChange={(e, newValue) => {
            handleUpdateScore(5 - (newValue as number), "bottom")
          }}
          orientation={"vertical"}
        />
        <AxisLabel>
          <YAxisPositive>성적 만족도</YAxisPositive>
          <YAxisNegative>얻어가는 것</YAxisNegative>
          <XAxisNegative>강의력</XAxisNegative>
          <XAxisPositive>수라밸</XAxisPositive>
        </AxisLabel>
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
  margin-top: 30px;
  z-index: -10;
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
  transform: translate(-2px, -50%);
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
const AxisLabel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`

const YAxisPositive = styled(DetailHighlight)`
  position: absolute;
  top: -5%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const YAxisNegative = styled(DetailHighlight)`
  position: absolute;
  left: 50%;
  top: 105%;
  transform: translate(-50%, -50%);
`
const XAxisNegative = styled(DetailHighlight)`
  position: absolute;
  top: 56%;
  left: 10%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  white-space: nowrap;
`
const XAxisPositive = styled(DetailHighlight)`
  position: absolute;
  top: 56%;
  left: 90%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  white-space: nowrap;
`
