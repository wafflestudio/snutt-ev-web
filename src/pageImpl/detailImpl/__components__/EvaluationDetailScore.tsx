import styled from '@emotion/styled';
import { Box } from '@mui/material';

import { RatingGraph, RatingGraphAxis } from '@/lib/components/RatingGraph';
import { EvaluationDTO } from '@/lib/dto/evaluation';

interface Props {
  score: Pick<EvaluationDTO, 'grade_satisfaction' | 'teaching_skill' | 'gains' | 'life_balance'>;
  isSnuevWarning?: boolean;
  size?: number;
}

export const EvaluationDetailScore = ({ score, isSnuevWarning = false, size = 280 }: Props) => {
  return (
    <ReviewDiagram $size={size}>
      <GraphWrapper>
        {isSnuevWarning ? (
          <RatingGraphAxis height={size} width={size} />
        ) : (
          <RatingGraph
            gradeSatisfaction={score.grade_satisfaction ?? 0}
            lifeBalance={score.life_balance ?? 0}
            gains={score.gains ?? 0}
            teachingSkill={score.teaching_skill ?? 0}
            height={size}
            width={size}
          />
        )}
      </GraphWrapper>

      <AxisLabel sx={{ left: '0%', top: 'calc(50% + 4px)' }}>강의력</AxisLabel>
      <AxisLabel sx={{ left: '50%', top: '8px', transform: 'translateX(-50%)' }}>성적 만족도</AxisLabel>
      <AxisLabel sx={{ right: '0%', top: 'calc(50% + 4px)' }}>수라밸</AxisLabel>
      <AxisLabel sx={{ left: '50%', bottom: '12px', transform: 'translateX(-50%)' }}>얻어가는 것</AxisLabel>
    </ReviewDiagram>
  );
};

const AxisLabel = styled(Box)`
  position: absolute;

  font-family: AppleSDGothicNeo;
  font-weight: bold;
  font-size: 10px;
  line-height: 11px;

  color: ${({ theme }) => theme.colors.text.default};
`;

const ReviewDiagram = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  text-align: center;
  align-self: center;
  padding: 28px 0 28px 0;
  margin-bottom: 10px;

  position: relative;
`;

const GraphWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
