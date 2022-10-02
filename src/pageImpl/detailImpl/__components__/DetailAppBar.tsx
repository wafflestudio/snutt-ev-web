import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { AppBar } from '@/lib/components/Appbar';
import SvgArrowBack from '@/lib/components/Icons/SvgArrowBack';
import SvgWrite from '@/lib/components/Icons/SvgWrite';
import { Title01 } from '@/lib/components/Text';

interface Props {
  id: number;
  goBack: () => void;
}

export const DetailAppBar = ({ id, goBack }: Props) => {
  const router = useRouter();

  return (
    <AppBar
      leftImage={
        <BackButton onClick={goBack}>
          <SvgArrowBack width={30} height={30} />
        </BackButton>
      }
    >
      <AppBarContent>
        <Title01 style={{ marginLeft: 12 }}>강의평</Title01>
        <WriteButton onClick={() => router.push(`/create?id=${id}`)}>
          <SvgWrite height={30} width={30} />
        </WriteButton>
      </AppBarContent>
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

const WriteButton = styled.button`
  width: 30px;
  height: 30px;
  z-index: 9999;
  background: transparent;
  border: none;
  padding: 0;
`;

const AppBarContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 12px;
`;