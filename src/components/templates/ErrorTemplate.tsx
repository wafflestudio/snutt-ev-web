import styled from '@emotion/styled';

import { SvgReviewIcon } from '@/components/atoms/Icons/SvgReviewIcon';
import { SvgSurprisedCat } from '@/components/atoms/Icons/SvgSurprisedCat';
import { Title02 } from '@/components/atoms/Typography';
import { useLog } from '@/hooks/useLog';
import { truffleClient } from '@/truffle';

export const ErrorTemplate = () => {
  useLog(() => {
    truffleClient.capture(new Error('error template view'));
  });

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
