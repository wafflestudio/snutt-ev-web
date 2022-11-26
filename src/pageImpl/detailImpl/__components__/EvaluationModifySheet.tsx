import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import Sheet from 'react-modal-sheet';

import { SvgReport } from '@/lib/components/Icons/SvgReport';
import { SvgTrash } from '@/lib/components/Icons/SvgTrash';
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
  const theme = useTheme();

  if (!isOpened) return null;

  return (
    <Sheet isOpen={isOpened} onClose={onClose} snapPoints={[75]} disableDrag>
      <Sheet.Container>
        <Sheet.Content style={{ backgroundColor: theme.colors.bg.default }}>
          <Wrapper>
            {isModifiable && (
              <DeleteContainer onClick={onDeleteClicked}>
                <SvgTrash />
                <Subheading02 style={{ marginLeft: '25px' }}>강의평 삭제</Subheading02>
              </DeleteContainer>
            )}
            {isReportable && (
              <ReportContainer onClick={onReportClicked}>
                <SvgReport />
                <Subheading02 style={{ marginLeft: '25px' }}>강의평 신고하기</Subheading02>
              </ReportContainer>
            )}
          </Wrapper>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop style={{ border: 'none' }} onTap={() => onClose()} />
    </Sheet>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
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
