import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { AppBar } from '@/lib/components/Appbar';
import SvgSearchOff from '@/lib/components/Icons/SvgSearchOff';
import SvgTimetableOn from '@/lib/components/Icons/SvgTimetableOn';
import { Title01 } from '@/lib/components/Text';

export const MainAppBar = () => {
  const router = useRouter();

  return (
    <AppBar left={<SvgTimetableOn height={30} width={30} />}>
      <AppBarContent>
        <Title>강의평</Title>
        <SvgSearchOff data-testid="main-search-icon" height={30} width={30} onClick={() => router.push('/search')} />
      </AppBarContent>
    </AppBar>
  );
};

const AppBarContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 12px;
`;

const Title = styled(Title01)`
  margin-left: 12px;
`;
