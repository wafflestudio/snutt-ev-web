import styled from '@emotion/styled';
import { Slider } from '@mui/material';

import { RatingGraph } from '@/lib/components/RatingGraph';
import { DetailHighlight, Title01 } from '@/lib/components/Text';
import { RatingTooltip } from '@/lib/components/Tooltip';

interface Props {
  defaultValue: number;
  score: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  };
  handleUpdateScore: (value: number, direction: 'top' | 'left' | 'bottom' | 'right') => void;
}

export const EvalPolygon = ({ defaultValue, score, handleUpdateScore }: Props) => {
  const { top, left, bottom, right } = score;

  const sliderCommonProps = {
    min: 0,
    max: 5,
    step: 1,
    defaultValue,
    valueLabelDisplay: 'off' as const,
  };

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
        <AxisLabel>
          <YAxisPositive>성적 만족도</YAxisPositive>
          <YAxisNegative>얻어가는 것</YAxisNegative>
          <XAxisNegative>강의력</XAxisNegative>
          <XAxisPositive>수라밸</XAxisPositive>
        </AxisLabel>
        <CustomSliderRight
          value={right}
          onChange={withChangeSlider((newValue) => handleUpdateScore(newValue, 'right'))}
          {...sliderCommonProps}
        />
        <CustomSliderTop
          value={top}
          onChange={withChangeSlider((newValue) => handleUpdateScore(newValue as number, 'top'))}
          orientation={'vertical'}
          {...sliderCommonProps}
        />
        <CustomSliderLeft
          dir="rtl"
          value={5 - left}
          onChange={withChangeSlider((newValue) => handleUpdateScore(5 - (newValue as number), 'left'))}
          {...sliderCommonProps}
        />
        <CustomSliderBottom
          value={5 - bottom}
          onChange={withChangeSlider((newValue) => handleUpdateScore(5 - (newValue as number), 'bottom'))}
          orientation={'vertical'}
          {...sliderCommonProps}
        />
      </GraphWrapper>
    </Container>
  );
};

const withChangeSlider = (callback: (newValue: number) => void) => {
  return (e: unknown, newValue: number | number[]) => {
    if (Array.isArray(newValue)) return;
    callback(newValue);
  };
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 28px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const GraphWrapper = styled.div`
  height: 300px;
  width: 300px;
  position: relative;
  margin-top: 72px;
`;

const CustomSlider = styled(Slider)`
  display: inline-block;
  position: relative;
  cursor: pointer;

  .MuiSlider-rail {
    display: none;
  }

  .MuiSlider-track {
    display: none;
  }

  .MuiSlider-thumb {
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    border-radius: 50%;
    border: 2px solid #1ac5bd;
    background-color: #fff;
    transition: none;

    // important 안주면 Mui default css 우선순위가 더 높음
    box-shadow: none !important;

    &::after {
      content: none;
    }
  }
`;

const CustomSliderVertical = styled(CustomSlider)`
  height: 150px;
  width: 4px;
  padding: 0px 13px;
`;

const CustomSliderHorizontal = styled(CustomSlider)`
  height: 4px;
  width: 150px;
  padding: 13px 0;
`;

const CustomSliderRight = styled(CustomSliderHorizontal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-2px, -50%);
`;

const CustomSliderLeft = styled(CustomSliderHorizontal)`
  position: absolute;
  top: 50%;
  left: 0%;
  transform: translate(0, -50%);
`;

const CustomSliderTop = styled(CustomSliderVertical)`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
`;

const CustomSliderBottom = styled(CustomSliderVertical)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0);
`;

const AxisLabel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const YAxisPositive = styled(DetailHighlight)`
  position: absolute;
  top: -5%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const YAxisNegative = styled(DetailHighlight)`
  position: absolute;
  left: 50%;
  top: 105%;
  transform: translate(-50%, -50%);
`;

const XAxisNegative = styled(DetailHighlight)`
  position: absolute;
  top: 56%;
  left: 0%;
  transform: translate(0%, -50%);
  overflow: hidden;
  white-space: nowrap;
`;

const XAxisPositive = styled(DetailHighlight)`
  position: absolute;
  top: 56%;
  right: 0%;
  transform: translate(0%, -50%);
  overflow: hidden;
  white-space: nowrap;
`;
