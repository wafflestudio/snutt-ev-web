import styled from '@emotion/styled';

import { SvgReport } from '@/lib/components/atoms/Icons/SvgReport';
import { SvgTrash } from '@/lib/components/atoms/Icons/SvgTrash';
import { Subheading02 } from '@/lib/components/atoms/Typography';
import { Bottomsheet } from '@/lib/components/templates/Bottomsheet';

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
  return (
    <Bottomsheet isOpen={isOpened} close={onClose}>
      <Bottomsheet.Content>
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
