import styled from '@emotion/styled';
import { PropsWithChildren, ReactNode } from 'react';

interface Props {
  leftImage: ReactNode;
}

export const AppBar = ({ leftImage, children }: PropsWithChildren<Props>) => {
  return (
    <Wrapper data-testid="app-bar">
      <AppBarLeft>{leftImage}</AppBarLeft>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  order: 1;
  height: 56px;

  position: sticky;
  top: 0;

  background-color: ${({ theme }) => theme.colors.bg};
  border-bottom: solid 1px rgba(179, 179, 179, 0.3);
  z-index: 99;
`;

const AppBarLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 13px;
`;
