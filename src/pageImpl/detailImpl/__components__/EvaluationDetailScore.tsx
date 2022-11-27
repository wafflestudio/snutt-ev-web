import styled from '@emotion/styled';

import { RatingGraph, RatingGraphAxis } from '@/lib/components/organisms/RatingGraph';
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
            top={score.grade_satisfaction ?? 0}
            right={score.life_balance ?? 0}
            bottom={score.gains ?? 0}
            left={score.teaching_skill ?? 0}
            height={size}
            width={size}
          />
        )}
      </GraphWrapper>

      <AxisLabel style={{ left: '0%', top: 'calc(50% + 4px)' }}>강의력</AxisLabel>
      <AxisLabel style={{ left: '50%', top: '8px', transform: 'translateX(-50%)' }}>성적 만족도</AxisLabel>
      <AxisLabel style={{ right: '0%', top: 'calc(50% + 4px)' }}>수라밸</AxisLabel>
      <AxisLabel style={{ left: '50%', bottom: '12px', transform: 'translateX(-50%)' }}>얻어가는 것</AxisLabel>
    </ReviewDiagram>
  );
};

const AxisLabel = styled.div`
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
