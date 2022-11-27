import styled from '@emotion/styled';
import { useState } from 'react';

import { Button } from '@/lib/components/atoms/Button';
import { Input } from '@/lib/components/atoms/Input';
import { Dialog } from '@/lib/components/templates/Dialog';

interface Props {
  isOpen: boolean;
  close: () => void;
  report: (reason: string) => void;
}

export const ReportEvaluationDialog = ({ isOpen, close, report }: Props) => {
  const [reason, setReason] = useState('');

  const handleClose = () => {
    setReason('');
    close();
  };

  const isReasonEmpty = reason.length === 0;

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <Dialog.Title>강의평 신고</Dialog.Title>
      <Dialog.Content>
        <Dialog.ContentText>강의평 신고 사유를 적어주세요.</Dialog.ContentText>
        <StyledInput variant="standard" value={reason} onChange={(e) => setReason(e.target.value)} />
      </Dialog.Content>
      <Dialog.Actions>
        <Button variant="text" size="small" onClick={handleClose}>
          취소
        </Button>
        <Button variant="text" size="small" disabled={isReasonEmpty} onClick={() => report(reason)}>
          신고
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const StyledInput = styled(Input)`
  margin-top: 16px;
  width: 100%;
`;
