import styled from '@emotion/styled';

import { DetailHighlight, Title01 } from '@/components/atoms/Typography';
import { RatingGraph } from '@/components/organisms/RatingGraph';
import { RatingTooltip } from '@/components/organisms/RatingTooltip';
import { COLORS } from '@/styles/colors';

interface Props {
  score: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  };
  handleUpdateScore: (value: number, direction: 'top' | 'left' | 'bottom' | 'right') => void;
}

export const CreateScoreStep = ({ score, handleUpdateScore }: Props) => {
  return (
    <Container>
      <Row>
        <Title01>점을 움직여 네가지 항목을 평가해주세요</Title01>
        <RatingTooltip />
      </Row>

      <GraphWrapper>
        <RatingGraph height={300} width={300} {...score} />

        <AxisLabel>
          <YAxisPositive>성적 만족도</YAxisPositive>
          <YAxisNegative>얻어가는 것</YAxisNegative>
          <XAxisNegative>강의력</XAxisNegative>
          <XAxisPositive>수라밸</XAxisPositive>
        </AxisLabel>

        {(['top', 'left', 'right', 'bottom'] as const).map((d) => (
          <ScoreSlider
            data-testid={`create-score-slider-${d}`}
            key={d}
            $direction={d}
            type="range"
            min={0}
            max={5}
            step={1}
            value={score[d]}
            onChange={(e) => handleUpdateScore(Number(e.target.value), d)}
          />
        ))}
      </GraphWrapper>
    </Container>
  );
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

const ScoreSlider = styled.input<{ $direction: keyof Props['score'] }>`
  position: absolute;
  width: calc(50% + 18px);
  height: 0px;
  top: 50%;
  left: 50%;
  transform-origin: left;
  transform: rotate(${({ $direction }) => ({ top: 270, left: 180, bottom: 90, right: 0 }[$direction])}deg)
    translateY(-50%);

  margin: 0;
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;

    cursor: pointer;
    transform: translateX(-9px);
    width: 18px;
    height: 18px;
    background-color: ${COLORS.white};
    border-radius: 50%;
    border: 2px solid ${COLORS.mint};
  }

  &::-moz-range-thumb {
    cursor: pointer;
    transform: translateX(-9px);
    width: 18px;
    height: 18px;
    background-color: ${COLORS.white};
    border-radius: 50%;
    border: 2px solid ${COLORS.mint};
  }
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
