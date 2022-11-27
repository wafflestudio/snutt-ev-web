import styled from '@emotion/styled';

import SvgExit from '@/lib/components/atoms/Icons/SvgExit';
import { Dialog } from '@/lib/components/templates/Dialog';
import { EvaluationDTO } from '@/lib/dto/evaluation';

import { EvaluationDetailScore } from './EvaluationDetailScore';

interface Props {
  isOpen: boolean;
  close: () => void;
  evaluation?: EvaluationDTO;
}

export const EvaluationScoreDialog = ({ isOpen, close, evaluation }: Props) => {
  return (
    <Dialog open={isOpen} onClose={close}>
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
