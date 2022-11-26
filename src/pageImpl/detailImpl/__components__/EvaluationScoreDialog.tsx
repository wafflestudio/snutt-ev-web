import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Dialog } from '@mui/material';

import SvgExit from '@/lib/components/Icons/SvgExit';
import { EvaluationDTO } from '@/lib/dto/evaluation';

import { EvaluationDetailScore } from './EvaluationDetailScore';

interface Props {
  isOpen: boolean;
  close: () => void;
  evaluation?: EvaluationDTO;
}

export const EvaluationScoreDialog = ({ isOpen, close, evaluation }: Props) => {
  const theme = useTheme();

  return (
    <Dialog open={isOpen} onClose={close} PaperProps={{ style: { backgroundColor: theme.colors.bg.default } }}>
      {evaluation && (
        <Wrapper data-testid="detail-evaluation-score-dialog" data-id={evaluation.id}>
          <CloseButton
            data-testid="detail-evaluation-score-dialog-close-button"
            width={30}
            height={30}
            onClick={close}
          />
          <EvaluationDetailScore score={evaluation} size={240} />
        </Wrapper>
      )}
    </Dialog>
  );
};

const Wrapper = styled.div`
  padding: 35px 25px;
  position: relative;
`;

const CloseButton = styled(SvgExit)`
  position: absolute;
  top: 8px;
  right: 8px;
`;
