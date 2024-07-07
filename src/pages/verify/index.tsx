// import { MailVerifyImpl } from '@/pageImpl/mailVerifyImpl';
import styled from '@emotion/styled';

import SvgTimetableOn from '@/components/atoms/Icons/SvgTimetableOn';
import { SvgWaffleCat } from '@/components/atoms/Icons/SvgWaffleCat';
import { Highlight, Subheading02Temp, Title01 } from '@/components/atoms/Typography';
import { AppBar } from '@/components/molecules/AppBar';
import { withGetServerSideProps } from '@/utils/withGetServersideProps';

export default function Verify() {
  return (
    <>
      <AppBar left={<SvgTimetableOn height={30} width={30} />}>
        <Title01 style={{ marginLeft: 12 }}>강의평</Title01>
      </AppBar>
      <Container>
        <SvgWaffleCat />
        <Subheading02Temp style={{ marginBottom: 40, marginTop: 48, textAlign: 'center' }}>
          현재 강의평 서비스 이용을 위한
          <br />
          이메일 인증 기능이 일시적으로 제한된 상태입니다.
          <br />
          <br />
          강의평 기능을 이용하고자 하시는 분은
          <br />
          <Highlight>마이스누 메일</Highlight>을 이용하여 <Highlight>snutt@wafflestudio.com</Highlight>으로
          <br />
          인증 요청을 보내주시기 바랍니다.
        </Subheading02Temp>
      </Container>
    </>
  );
  // return <MailVerifyImpl />;
}

export const getServerSideProps = withGetServerSideProps(
  async () => {
    return { props: {} };
  },
  { emailVerification: 'not-verified' },
);

const Container = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
