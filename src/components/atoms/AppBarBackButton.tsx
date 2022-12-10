import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ButtonHTMLAttributes } from 'react';

import SvgArrowBack from './Icons/SvgArrowBack';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const AppBarBackButton = (props: Props) => {
  const router = useRouter();

  const { onClick = () => router.back(), ...restProps } = props;

  return (
    <BackButton onClick={onClick} {...restProps}>
      <ArrowBackIcon width={30} height={30} />
    </BackButton>
  );
};

const BackButton = styled.button`
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  padding: 0;
`;

const ArrowBackIcon = styled(SvgArrowBack)`
  path {
    fill: ${({ theme }) => theme.colors.icon.outlined.stroke};
  }
`;
