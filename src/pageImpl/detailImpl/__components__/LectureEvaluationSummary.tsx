import styled from '@emotion/styled';

import SvgStarSmallEmpty from '@/lib/components/Icons/SvgStarSmallEmpty';
import SvgStarSmallFilled from '@/lib/components/Icons/SvgStarSmallFilled';
import { Detail, Subheading02, Title01 } from '@/lib/components/Text';
import { EvaluationSummaryDTO } from '@/lib/dto/evaluationSummary';

interface Props {
  summaryData?: EvaluationSummaryDTO;
  count?: number;
  isEmpty?: boolean;
}

export const LectureEvaluationSummary = ({ summaryData, count, isEmpty }: Props) => {
  return (
    <ReviewSummary>
      <ReviewSummaryLeft>
        <Title01>{summaryData?.title}</Title01>
        <InstructorName>
          {summaryData?.instructor} / {summaryData?.credit}학점 ({summaryData?.classification})
        </InstructorName>
      </ReviewSummaryLeft>
      <ReviewSummaryRight>
        <ReviewScore>
          {isEmpty ? <SvgStarSmallEmpty height={19} width={19} /> : <SvgStarSmallFilled height={19} width={19} />}
          <Title01 style={{ marginLeft: 6, marginTop: 0 }}>{summaryData?.evaluation?.avg_rating?.toFixed(1)}</Title01>
        </ReviewScore>
        <ReviewCount>{count}개의 강의평</ReviewCount>
      </ReviewSummaryRight>
    </ReviewSummary>
  );
};

const ReviewSummary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 10px 0 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.divider};
`;

const ReviewSummaryLeft = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;

const InstructorName = styled(Subheading02)`
  margin-top: 3px;
  color: rgb(119, 119, 119);
`;

const ReviewSummaryRight = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewScore = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
`;

const ReviewCount = styled(Detail)`
  margin-top: 3px;
  color: rgb(102, 102, 102);
  white-space: nowrap;
`;
