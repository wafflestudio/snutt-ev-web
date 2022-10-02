import styled from '@emotion/styled';

import SurprisedCatImage from '@/assets/icons/surprised_cat.svg';
import { Detail } from '@/lib/components/Text';

interface Props {
  className?: string;
}

export const MyEvaluationEmpty = ({ className }: Props) => {
  return (
    <Wrapper className={className} data-testid="my-evaluations-empty">
      <SurprisedCatImage />
      <Caption>아직 작성한 강의평이 없습니다.</Caption>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Caption = styled(Detail)`
  margin-top: 20px;
`;
