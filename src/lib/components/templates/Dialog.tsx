import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

import { Backdrop } from '@/lib/components/atoms/Backdrop';
import { Portal } from '@/lib/components/organisms/Portal';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const Dialog = ({ children, open, onClose }: PropsWithChildren<Props>) => {
  return (
    <Portal>
      <Dimmer visible={open} onClick={onClose}>
        <Container onClick={(e) => e.stopPropagation()}>{children}</Container>
      </Dimmer>
    </Portal>
  );
};

const Title = styled.div`
  font-family: AppleSDGothicNeo;
  padding: 16px 24px;
  color: ${({ theme }) => theme.colors.text.default};
  font-size: 1.25rem;
  margin: 0;
  font-weight: 500;
  letter-spacing: 0.01em;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px 16px;
`;

const Content = styled.div`
  padding: 0 24px 20px;
`;

const ContentText = styled.div`
  font-family: AppleSDGothicNeo;
  color: ${({ theme }) => theme.colors.text.default};
`;

const Dimmer = styled(Backdrop)`
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.bg.default};
  border-radius: 4px;
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14),
    0px 9px 46px 8px rgba(0, 0, 0, 0.12);
  margin: 32px;
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: calc(100%-64px);
  overflow-y: auto;
  max-width: 600px;
`;

Dialog.Title = Title;
Dialog.Actions = Actions;
Dialog.Content = Content;
Dialog.ContentText = ContentText;
