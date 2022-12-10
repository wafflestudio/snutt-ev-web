import styled from '@emotion/styled';
import { PropsWithChildren, ReactNode } from 'react';

import { AppBarBackButton } from '@/components/atoms/AppBarBackButton';
import { AppBarCloseButton } from '@/components/atoms/AppBarCloseButton';

interface Props {
  left: ReactNode;
}

export const AppBar = ({ left, children }: PropsWithChildren<Props>) => {
  return (
    <Wrapper data-testid="app-bar">
      <AppBarLeft>{left}</AppBarLeft>
      {children}
    </Wrapper>
  );
};

AppBar.BackButton = AppBarBackButton;
AppBar.CloseButton = AppBarCloseButton;

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  order: 1;
  height: 56px;

  position: sticky;
  top: 0;

  background-color: ${({ theme }) => theme.colors.bg.default};
  border-bottom: solid 1px rgba(179, 179, 179, 0.3);
  z-index: 99;
`;

const AppBarLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 13px;
`;
