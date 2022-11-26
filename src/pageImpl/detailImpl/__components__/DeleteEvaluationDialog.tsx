import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

interface Props {
  isOpen: boolean;
  close: () => void;
  confirmDelete: () => void;
}

export const DeleteEvaluationDialog = ({ isOpen, close, confirmDelete }: Props) => {
  const theme = useTheme();

  return (
    <Dialog open={isOpen} onClose={close} PaperProps={{ style: { backgroundColor: theme.colors.bg.default } }}>
      <Title>이 강의평을 삭제하시겠습니까?</Title>
      <DialogActions>
        <Button onClick={close}>취소</Button>
        <Button onClick={confirmDelete}>삭제</Button>
      </DialogActions>
    </Dialog>
  );
};

const Title = styled(DialogTitle)`
  color: ${({ theme }) => theme.colors.text.default};
`;
