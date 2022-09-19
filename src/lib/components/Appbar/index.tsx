import styled from '@emotion/styled';
import { PropsWithChildren, ReactNode } from 'react';

interface Props {
  LeftImage: React.FC | ReactNode; // TODO: ReactNode 만 허용하기
}

export const AppBar = ({ LeftImage, children }: PropsWithChildren<Props>) => {
  return (
    <Wrapper data-test="app-bar">
      <AppBarLeft>
        {typeof LeftImage === 'function' ? <LeftImage /> : LeftImage}
      </AppBarLeft>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  order: 1;
  height: 56px;

  position: sticky;
  top: 0;

  background-color: white;
  border-bottom: solid 1px rgba(179, 179, 179, 0.3);
  z-index: 99;
`;

const AppBarLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 13px;
`;
