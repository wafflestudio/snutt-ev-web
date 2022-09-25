import styled from '@emotion/styled';

import SurprisedCatImage from '@/assets/icons/surprised_cat.svg';
import { Subheading02 } from '@/lib/components/Text';

interface Props {
  'data-testid'?: string;
}

export const EmptyReviewPlaceholder = ({ 'data-testid': dataTestId }: Props) => {
  return (
    <Wrapper data-testid={dataTestId}>
      <SurprisedCatImage />
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
