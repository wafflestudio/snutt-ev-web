import styled from '@emotion/styled';

import { SvgSurprisedCat } from '@/components/atoms/Icons/SvgSurprisedCat';
import { Detail } from '@/components/atoms/Typography';

interface Props {
  className?: string;
}

export const MyEvaluationEmpty = ({ className }: Props) => {
  return (
    <Wrapper className={className} data-testid="my-evaluations-empty">
      <SvgSurprisedCat />
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
