import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

interface Props {
  isOpen: boolean;
  close: () => void;
  report: (reason: string) => void;
}

export const ReportEvaluationDialog = ({ isOpen, close, report }: Props) => {
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (!isOpen && reason) setReason('');
  }, [isOpen, reason]);

  const isReasonEmpty = reason.length === 0;

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>강의평 신고</DialogTitle>
      <DialogContent>
        <DialogContentText>강의평 신고 사유를 적어주세요.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          fullWidth
          variant="standard"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>취소</Button>
        <Button disabled={isReasonEmpty} onClick={() => report(reason)}>
          신고
        </Button>
      </DialogActions>
    </Dialog>
  );
};
