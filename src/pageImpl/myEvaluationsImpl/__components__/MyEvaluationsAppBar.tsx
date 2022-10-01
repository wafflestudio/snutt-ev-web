import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { AppBar } from '@/lib/components/Appbar';
import SvgArrowBack from '@/lib/components/Icons/SvgArrowBack';
import { Title01 } from '@/lib/components/Text';

export const MyEvaluationsAppBar = () => {
  const router = useRouter();

  return (
    <AppBar
      leftImage={
        <BackButton onClick={() => router.back()}>
          <SvgArrowBack width={30} height={30} />
        </BackButton>
      }
    >
      <Title>내가 남긴 강의평</Title>
    </AppBar>
  );
};

const BackButton = styled.button`
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  padding: 0;
`;

const Title = styled(Title01)`
  margin-left: 12px;
`;
