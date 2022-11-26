import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';

import { Button } from '@/lib/components/atoms/Button';

interface Props {
  isOpen: boolean;
  close: () => void;
  report: (reason: string) => void;
}

export const ReportEvaluationDialog = ({ isOpen, close, report }: Props) => {
  const [reason, setReason] = useState('');
  const theme = useTheme();

  const handleClose = () => {
    setReason('');
    close();
  };

  const isReasonEmpty = reason.length === 0;

  return (
    <Dialog open={isOpen} onClose={handleClose} PaperProps={{ style: { backgroundColor: theme.colors.bg.default } }}>
      <Title>강의평 신고</Title>
      <DialogContent>
        <ContentText>강의평 신고 사유를 적어주세요.</ContentText>
        <TextField
          sx={{ input: { color: theme.colors.text.form } }}
          autoFocus
          margin="dense"
          fullWidth
          variant="standard"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="text" size="small" onClick={handleClose}>
          취소
        </Button>
        <Button variant="text" size="small" disabled={isReasonEmpty} onClick={() => report(reason)}>
          신고
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Title = styled(DialogTitle)`
  color: ${({ theme }) => theme.colors.text.default};
`;

const ContentText = styled(DialogContentText)`
  color: ${({ theme }) => theme.colors.text.default};
`;
