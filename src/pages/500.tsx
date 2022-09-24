import styled from '@emotion/styled';
import React from 'react';

import { AppBar } from '@/lib/components/Appbar';
import SvgTimetableOn from '@/lib/components/Icons/SvgTimetableOn';
import { SvgWaffleCat } from '@/lib/components/Icons/SvgWaffleCat';
import { Title01, Title02 } from '@/lib/components/Text';

export default function Custom500() {
  return (
    <>
      <AppBar leftImage={<SvgTimetableOn height={30} width={30} />}>
        <Title01 style={{ marginLeft: 12 }}>강의평</Title01>
      </AppBar>
      <Container>
        <Title02 style={{ marginBottom: 40, textAlign: 'center' }}>
          오류가 발생했습니다.
        </Title02>
        <SvgWaffleCat />
        <OurName>@wafflestudio</OurName>
      </Container>
    </>
  );
}

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