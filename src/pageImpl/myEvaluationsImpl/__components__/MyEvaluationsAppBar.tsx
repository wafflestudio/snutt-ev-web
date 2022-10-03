import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { AppBar } from '@/lib/components/Appbar';
import SvgArrowBack from '@/lib/components/Icons/SvgArrowBack';
import { Detail, Title01 } from '@/lib/components/Text';
import { COLORS } from '@/lib/styles/colors';

interface Props {
  totalCount?: number;
}

export const MyEvaluationsAppBar = ({ totalCount }: Props) => {
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
      {totalCount !== undefined && <Count data-testid="my-evaluations-total-count">({totalCount}개)</Count>}
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

const Count = styled(Detail)`
  margin-left: 8px;
  color: ${COLORS.gray2};
`;
