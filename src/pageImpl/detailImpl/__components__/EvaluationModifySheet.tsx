import styled from '@emotion/styled';

import { SvgReport } from '@/components/atoms/Icons/SvgReport';
import { SvgTrash } from '@/components/atoms/Icons/SvgTrash';
import SvgWrite from '@/components/atoms/Icons/SvgWrite';
import { Subheading02 } from '@/components/atoms/Typography';
import { Bottomsheet } from '@/components/templates/Bottomsheet';

interface Props {
  isOpened: boolean;
  onClose: () => void;
  onDeleteClicked: () => void;
  onReportClicked: () => void;
  onEditClicked: () => void;
  isModifiable: boolean;
  isReportable: boolean;
}

export const EvaluationModifySheet = ({
  isOpened,
  onClose,
  onDeleteClicked,
  onReportClicked,
  onEditClicked,
  isModifiable,
  isReportable,
}: Props) => {
  return (
    <Bottomsheet isOpen={isOpened} close={onClose}>
      <Bottomsheet.Content>
        <Wrapper>
          {isModifiable && (
            <>
              <BottomSheetRow onClick={onEditClicked}>
                <SvgWrite width="30" height="30" />
                <Subheading02 style={{ marginLeft: '25px' }}>강의평 수정</Subheading02>
              </BottomSheetRow>
              <BottomSheetRow onClick={onDeleteClicked}>
                <SvgTrash />
                <Subheading02 style={{ marginLeft: '25px' }}>강의평 삭제</Subheading02>
              </BottomSheetRow>
            </>
          )}
          {isReportable && (
            <BottomSheetRow onClick={onReportClicked} data-testid="detail-evaluation-sheet-report">
              <SvgReport />
              <Subheading02 style={{ marginLeft: '25px' }}>강의평 신고하기</Subheading02>
            </BottomSheetRow>
          )}
        </Wrapper>
      </Bottomsheet.Content>
    </Bottomsheet>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-around;
  flex-direction: column;
`;

const BottomSheetRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
