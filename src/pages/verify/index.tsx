// import { MailVerifyImpl } from '@/pageImpl/mailVerifyImpl';
import styled from '@emotion/styled';

import SvgTimetableOn from '@/components/atoms/Icons/SvgTimetableOn';
import { SvgWaffleCat } from '@/components/atoms/Icons/SvgWaffleCat';
import { Title01, Title02 } from '@/components/atoms/Typography';
import { AppBar } from '@/components/molecules/AppBar';
import { withGetServerSideProps } from '@/utils/withGetServersideProps';

export default function Verify() {
  return (
    <>
      <AppBar left={<SvgTimetableOn height={30} width={30} />}>
        <Title01 style={{ marginLeft: 12 }}>강의평</Title01>
      </AppBar>
      <Container>
        <Title02 style={{ marginBottom: 40, textAlign: 'center' }}>
          <br />
          페이지를 찾을 수 없습니다
        </Title02>
        <SvgWaffleCat />
        <OurName>@wafflestudio</OurName>
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

const OurName = styled.div`
  font-family: AppleSDGothicNeo;
  font-size: 9px;
  margin-top: 25px;
`;
