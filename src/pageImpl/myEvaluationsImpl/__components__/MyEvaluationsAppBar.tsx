import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { Detail, Title01 } from '@/components/atoms/Typography';
import { AppBar } from '@/components/molecules/AppBar';
import { COLORS } from '@/styles/colors';

interface Props {
  totalCount?: number;
}

export const MyEvaluationsAppBar = ({ totalCount }: Props) => {
  const router = useRouter();

  return (
    <AppBar left={<AppBar.BackButton onClick={() => router.back()} />}>
      <Title>내가 남긴 강의평</Title>
      {totalCount !== undefined && <Count data-testid="my-evaluations-total-count">({totalCount}개)</Count>}
    </AppBar>
  );
};

const Title = styled(Title01)`
  margin-left: 12px;
`;

const Count = styled(Detail)`
  margin-left: 8px;
  color: ${COLORS.gray2};
`;
