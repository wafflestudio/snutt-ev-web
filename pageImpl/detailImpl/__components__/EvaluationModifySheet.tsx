import styled from "@emotion/styled"
import React from "react"
import Sheet from "react-modal-sheet"
import TrashIcon from "public/icons/trash.svg"
import ReportIcon from "public/icons/report.svg"
import { Subheading02 } from "@lib/components/Text"

interface Props {
  isOpened: boolean
  onClose: () => void
  isModifiable: boolean
  isReportable: boolean
}

const EvaluationModifySheet: React.FC<Props> = ({
  isOpened,
  onClose,
  isModifiable,
  isReportable,
}) => {
  return (
    <Sheet isOpen={isOpened} onClose={onClose} snapPoints={[75]} disableDrag>
      <Sheet.Container onViewportBoxUpdate={true}>
        <Sheet.Content onViewportBoxUpdate={true}>
          <Wrapper>
            {isModifiable && (
              <DeleteContainer>
                <TrashIcon />
                <Subheading02 style={{ marginLeft: "25px" }}>
                  강의평 삭제
                </Subheading02>
              </DeleteContainer>
            )}
            {isReportable && (
              <ReportContainer>
                <ReportIcon />
                <Subheading02 style={{ marginLeft: "25px" }}>
                  강의평 신고하기
                </Subheading02>
              </ReportContainer>
            )}
          </Wrapper>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop
        onViewportBoxUpdate={true}
        onTap={() => {
          onClose()
        }}
      />
    </Sheet>
  )
}

const Wrapper = styled.div`
  display: flex;
  margin: 20px;
  justify-content: space-around;
  flex-direction: column;
`

const ReportContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const DeleteContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export default EvaluationModifySheet
