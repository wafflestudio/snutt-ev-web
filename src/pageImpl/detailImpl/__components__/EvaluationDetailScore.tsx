import styled from '@emotion/styled';

import { RatingGraph, RatingGraphAxis } from '@/lib/components/RatingGraph';
import { EvaluationDTO } from '@/lib/dto/evaluation';

interface Props {
  score: Pick<EvaluationDTO, 'grade_satisfaction' | 'teaching_skill' | 'gains' | 'life_balance'>;
  isSnuevWarning?: boolean;
}

export const EvaluationDetailScore = ({ score, isSnuevWarning = false }: Props) => {
  return (
    <ReviewDiagram>
      <DiagramTop>
        <AxisLabel style={{ marginBottom: 10 }}>성적 만족도</AxisLabel>
      </DiagramTop>
      <DiagramMiddle>
        <YAxisLabel>강의력</YAxisLabel>
        {isSnuevWarning ? (
          <GraphWrapper>
            <RatingGraphAxis height={280} width={280} />
          </GraphWrapper>
        ) : (
          <GraphWrapper>
            <RatingGraph
              gradeSatisfaction={score.grade_satisfaction ?? 0}
              lifeBalance={score.life_balance ?? 0}
              gains={score.gains ?? 0}
              teachingSkill={score.teaching_skill ?? 0}
              height={280}
              width={280}
            />
          </GraphWrapper>
        )}
        <YAxisLabel>수라밸</YAxisLabel>
      </DiagramMiddle>
      <DiagramBottom>
        <AxisLabel>얻어가는 것</AxisLabel>
      </DiagramBottom>
    </ReviewDiagram>
  );
};

const DiagramTop = styled.div``;

const DiagramMiddle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
`;

const DiagramBottom = styled.div`
  height: 28px;
`;

const AxisLabel = styled.span`
  font-family: AppleSDGothicNeo;
  font-weight: bold;
  font-size: 10px;
  line-height: 11px;
`;

const YAxisLabel = styled(AxisLabel)`
  margin-top: 20px;
`;

const ReviewDiagram = styled.div`
  height: 330px;
  width: 290px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  text-align: center;
  align-self: center;
  padding: 8px 0 8px 0;
  margin-bottom: 10px;

  position: relative;
`;

const GraphWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
