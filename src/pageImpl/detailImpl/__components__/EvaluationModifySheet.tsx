import styled from '@emotion/styled';
import Sheet from 'react-modal-sheet';

import ReportIcon from '@/assets/icons/report.svg';
import TrashIcon from '@/assets/icons/trash.svg';
import { Subheading02 } from '@/lib/components/Text';

interface Props {
  isOpened: boolean;
  onClose: () => void;
  onDeleteClicked: () => void;
  onReportClicked: () => void;
  isModifiable: boolean;
  isReportable: boolean;
}

export const EvaluationModifySheet = ({
  isOpened,
  onClose,
  onDeleteClicked,
  onReportClicked,
  isModifiable,
  isReportable,
}: Props) => {
  return isOpened ? (
    <Sheet isOpen={isOpened} onClose={onClose} snapPoints={[75]} disableDrag>
      <Sheet.Container>
        <Sheet.Content>
          <Wrapper>
            {isModifiable && (
              <DeleteContainer onClick={onDeleteClicked}>
                <TrashIcon />
                <Subheading02 style={{ marginLeft: '25px' }}>강의평 삭제</Subheading02>
              </DeleteContainer>
            )}
            {isReportable && (
              <ReportContainer onClick={onReportClicked}>
                <ReportIcon />
                <Subheading02 style={{ marginLeft: '25px' }}>강의평 신고하기</Subheading02>
              </ReportContainer>
            )}
          </Wrapper>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop
        onTap={() => {
          onClose();
        }}
      />
    </Sheet>
  ) : null;
};

const Wrapper = styled.div`
  display: flex;
  margin: 20px;
  justify-content: space-around;
  flex-direction: column;
`;

const ReportContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DeleteContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
