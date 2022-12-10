import styled from '@emotion/styled';

import { SvgSurprisedCat } from '@/components/atoms/Icons/SvgSurprisedCat';
import { Subheading02 } from '@/components/atoms/Typography';

interface Props {
  'data-testid'?: string;
}

export const EmptyReviewPlaceholder = ({ 'data-testid': dataTestId }: Props) => {
  return (
    <Wrapper data-testid={dataTestId}>
      <SvgSurprisedCat />
      <Subheading02 style={{ marginTop: 20 }}>아직 강의평이 없습니다.</Subheading02>
      <Subheading02 style={{ marginTop: 10 }}>가장 먼저 강의평을 남겨주세요!</Subheading02>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 80px;

  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;

  text-align: center;
`;
