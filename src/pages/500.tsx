import styled from '@emotion/styled';
import { GetStaticProps } from 'next';

import SvgTimetableOn from '@/components/atoms/Icons/SvgTimetableOn';
import { SvgWaffleCat } from '@/components/atoms/Icons/SvgWaffleCat';
import { Title01, Title02 } from '@/components/atoms/Typography';
import { AppBar } from '@/components/molecules/AppBar';
import { useLog } from '@/hooks/useLog';
import { truffleClient } from '@/truffle';

export default function Custom500() {
  useLog(() => {
    truffleClient.capture(new Error('500 view'));
  });

  return (
    <>
      <AppBar left={<SvgTimetableOn height={30} width={30} />}>
        <Title01 style={{ marginLeft: 12 }}>강의평</Title01>
      </AppBar>
      <Container>
        <Title02 style={{ marginBottom: 40, textAlign: 'center' }}>오류가 발생했습니다.</Title02>
        <SvgWaffleCat />
        <OurName>@wafflestudio</OurName>
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // 에러 페이지는 쿠키를 읽을 수 없으므로 어쩔 수 없이 light 테마로 보여준다.
  return { props: { theme: 'light' } };
};

const Container = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const OurName = styled.div`
  font-family: AppleSDGothicNeo;
  font-size: 9px;
  margin-top: 25px;
`;
