import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

interface Props {
  isOpen: boolean;
  close: () => void;
  confirmDelete: () => void;
}

export const DeleteEvaluationDialog = ({ isOpen, close, confirmDelete }: Props) => {
  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>이 강의평을 삭제하시겠습니까?</DialogTitle>
      <DialogActions>
        <Button onClick={close}>취소</Button>
        <Button onClick={confirmDelete}>삭제</Button>
      </DialogActions>
    </Dialog>
  );
};
