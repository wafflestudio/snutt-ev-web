import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

import { Portal } from '@/lib/components/organisms/Portal';

import { Backdrop } from '../atoms/Backdrop';

interface Props {
  isOpen: boolean;
  close: () => void;
}

export const Bottomsheet = ({ children, isOpen, close }: PropsWithChildren<Props>) => {
  return (
    <Portal>
      <Dimmer visible={isOpen} onClick={close}>
        <Container $visible={isOpen} onClick={(e) => e.stopPropagation()}>
          {children}
        </Container>
      </Dimmer>
    </Portal>
  );
};

const Dimmer = styled(Backdrop)`
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Container = styled.div<{ $visible: boolean }>`
  transform: ${({ $visible }) => ($visible ? 'none' : 'translateY(100%)')};
  transition: transform 0.2s;
  background-color: ${({ theme }) => theme.colors.bg.default};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const Content = styled.div``;

Bottomsheet.Content = Content;
