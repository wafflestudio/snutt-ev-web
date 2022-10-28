import styled from '@emotion/styled';

import { SvgReviewIcon } from '@/lib/components/Icons/SvgReviewIcon';
import { SvgSurprisedCat } from '@/lib/components/Icons/SvgSurprisedCat';
import { Title02 } from '@/lib/components/Text/Title';

export const ErrorView = () => {
  return (
    <Container>
      <SvgSurprisedCat />
      <br />
      <Title02>에러가 발생했어요</Title02>
      <Row>
        <SvgReviewIcon />
        <Title02 style={{ marginTop: '8px', marginLeft: '6px' }}>하단의 강의평 탭을 다시 눌러주세요</Title02>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Row = styled.div`
  display: inline-flex;
`;
