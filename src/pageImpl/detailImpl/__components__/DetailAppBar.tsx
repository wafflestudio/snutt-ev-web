import styled from '@emotion/styled';
import { Router, useRouter } from 'next/router';

import SvgWrite from '@/components/atoms/Icons/SvgWrite';
import { Title01 } from '@/components/atoms/Typography';
import { AppBar } from '@/components/molecules/AppBar';

interface Props {
  id: number;
  onBack: 'back' | 'close';
}

export const DetailAppBar = ({ id, onBack }: Props) => {
  const router = useRouter();

  const goBack = () => {
    // TODO: remove
    // 아래 if문은 구클라 대응 로직. 아래 태스크가 끝나고 충분한 시간이 지나면 제거하고, else 문만 남겨서 무조건 뒤로가기하게 처리하면 된다.
    // https://www.notion.so/wafflestudio/d291fe606ec0407ea1292120b070db90
    if (((router as Router).components['/detail'] as { initial?: true }).initial) router.replace('/main');
    else router.back();
  };

  return (
    <AppBar left={{ back: <AppBar.BackButton onClick={goBack} />, close: <AppBar.CloseButton /> }[onBack]}>
      <AppBarContent>
        <Title01 style={{ marginLeft: 12 }}>강의평</Title01>
        <WriteButton onClick={() => router.push(`/create?id=${id}`)}>
          <SvgWrite height={30} width={30} />
        </WriteButton>
      </AppBarContent>
    </AppBar>
  );
};

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
