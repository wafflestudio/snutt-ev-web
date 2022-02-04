import styled from "@emotion/styled"
import { AppBar } from "@lib/components/Appbar"
import { useRouter } from "next/router"
import { Detail, Subheading02, Title01 } from "@lib/components/Text"
import { useEvaluationSummaryContainer } from "./__containers__/useEvaluationSummaryContainer"
import { LectureReviewCard } from "./__components__/LectureReviewCard"

import SvgWrite from "@lib/components/Icons/SvgWrite"
import SvgStarSmallFilled from "@lib/components/Icons/SvgStarSmallFilled"
import SvgArrowBack from "@lib/components/Icons/SvgArrowBack"
import { RatingGraph } from "@lib/components/RatingGraph"
import { useLectureEvaluationsContainer } from "@pageImpl/detailImpl/__containers__/useLectureEvaluationsContainer"
import useScrollLoader from "@lib/hooks/useScrollLoader"
import React, { useRef, useState } from "react"
import EvaluationModifySheet from "./__components__/EvaluationModifySheet"
import { EvaluationDTO } from "@lib/dto/core/evaluation"
import { useMyLectureEvaluationsContainer } from "./__containers__/useMyLectureEvaluationsContainer"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  TextField,
} from "@mui/material"
import { deleteEvaluation, postReportEvaluation } from "@lib/api/apis"
import { useMutation, useQueryClient } from "react-query"

export const DetailImpl = () => {
  const router = useRouter()
  const { id } = router.query

  const { summaryData } = useEvaluationSummaryContainer(Number(id))
  const { searchResult, fetchNextPage } = useLectureEvaluationsContainer(
    Number(id),
  )
  const { myReviewResult } = useMyLectureEvaluationsContainer(Number(id))
  const { loaderRef } = useScrollLoader(fetchNextPage)

  const queryClient = useQueryClient()

  const [moreSheetItem, setMoreSheetItem] = useState<EvaluationDTO | undefined>(
    undefined,
  )

  const deleteMutation = useMutation(deleteEvaluation, {
    onSuccess: () => {
      queryClient.invalidateQueries("evaluationSummary")
      queryClient.invalidateQueries("lectureEvaluation")
    },
  })
  const [deleteTargetId, setDeleteTargetId] = useState<number | undefined>(
    undefined,
  )
  const handleDeleteEvaluation = () => {
    setDeleteTargetId(moreSheetItem?.id)
    setMoreSheetItem(undefined)
  }
  const handleDeleteEvaluationConfirm = async () => {
    const target = deleteTargetId
    setDeleteTargetId(undefined)
    if (target !== undefined) {
      deleteMutation.mutate(target)
    }
  }

  const reportMutation = useMutation(
    ({ id, content }: { id: number; content: string }) =>
      postReportEvaluation(id, { content }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("evaluationSummary")
        queryClient.invalidateQueries("lectureEvaluation")
      },
    },
  )
  const [reportReason, setReportReason] = useState<string>("")
  const [reportTargetId, setReportTargetId] = useState<number | undefined>(
    undefined,
  )
  const handleReportEvaluation = () => {
    setReportTargetId(moreSheetItem?.id)
    setMoreSheetItem(undefined)
  }
  const handleReportEvaluationConfirm = async () => {
    const target = reportTargetId
    setReportTargetId(undefined)
    if (target !== undefined) {
      reportMutation.mutate({ id: target, content: reportReason ?? "" })
    }
  }

  return (
    <>
      <Wrapper>
        <Dialog
          open={deleteTargetId !== undefined}
          onClose={() => {
            setDeleteTargetId(undefined)
          }}
        >
          <DialogTitle>이 강의평을 삭제하시겠습니까?</DialogTitle>
          <DialogActions>
            <Button
              onClick={() => {
                setDeleteTargetId(undefined)
              }}
            >
              취소
            </Button>
            <Button
              onClick={() => {
                handleDeleteEvaluationConfirm()
              }}
            >
              삭제
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={reportTargetId !== undefined}
          onClose={() => {
            setReportTargetId(undefined)
          }}
        >
          <DialogTitle>강의평 신고</DialogTitle>
          <DialogContent>
            <DialogContentText>
              강의평 신고 사유를 적어주세요.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setReportReason(e.target.value)
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setReportTargetId(undefined)
              }}
            >
              취소
            </Button>
            <Button
              onClick={() => {
                handleReportEvaluationConfirm()
              }}
            >
              신고
            </Button>
          </DialogActions>
        </Dialog>
        <AppBar
          LeftImage={() => (
            <SvgArrowBack
              width={30}
              height={30}
              onClick={() => router.back()}
            />
          )}
        >
          <AppBarContent>
            <Title01 style={{ marginLeft: 12 }}>강의평</Title01>
            <SvgWrite
              height={30}
              width={30}
              onClick={() => router.push("/create/" + id)}
            />
          </AppBarContent>
        </AppBar>

        <Content>
          <ReviewSummary>
            <ReviewSummaryLeft>
              <Title01>{summaryData?.title}</Title01>
              <InstructorName>{summaryData?.instructor}</InstructorName>
            </ReviewSummaryLeft>
            <ReviewSummaryRight>
              <ReviewScore>
                <SvgStarSmallFilled height={19} width={19} />
                <Title01 style={{ marginLeft: 6, marginTop: 0 }}>
                  {summaryData?.evaluation?.avg_rating?.toFixed(1)}
                </Title01>
              </ReviewScore>
              <ReviewCount>
                {
                  searchResult?.pages[searchResult?.pages.length - 1]
                    .total_count
                }
                개의 강의평
              </ReviewCount>
            </ReviewSummaryRight>
          </ReviewSummary>

          <ReviewDiagram>
            <DiagramTop>
              <AxisLabel style={{ marginBottom: 10 }}>성적 만족도</AxisLabel>
            </DiagramTop>
            <DiagramMiddle>
              <YAxisLabel>강의력</YAxisLabel>
              <GraphWrapper>
                <RatingGraph
                  gradeSatisfaction={
                    summaryData?.evaluation?.avg_grade_satisfaction ?? 0
                  }
                  lifeBalance={summaryData?.evaluation?.avg_life_balance ?? 0}
                  gains={summaryData?.evaluation?.avg_gains ?? 0}
                  teachingSkill={
                    summaryData?.evaluation?.avg_teaching_skill ?? 0
                  }
                  height={280}
                  width={280}
                />
              </GraphWrapper>
              <YAxisLabel>수라밸</YAxisLabel>
            </DiagramMiddle>
            <DiagramBottom>
              <AxisLabel>얻어가는 것</AxisLabel>
            </DiagramBottom>
          </ReviewDiagram>

          <ReviewList>
            {myReviewResult?.evaluations.map((content, index) => (
              <LectureReviewCard
                review={content}
                key={content.id}
                onMoreClick={() => {
                  setMoreSheetItem(content)
                }}
                isMyReivew
              />
            ))}
            {searchResult?.pages ? (
              <React.Fragment>
                {searchResult?.pages?.map((content, i) => (
                  <React.Fragment key={i}>
                    {content.content.map((it) => (
                      <LectureReviewCard
                        review={it}
                        key={it.id}
                        onMoreClick={() => {
                          setMoreSheetItem(it)
                        }}
                      />
                    ))}
                  </React.Fragment>
                ))}
                <div ref={loaderRef} />
              </React.Fragment>
            ) : (
              // FIXME: Empty placeholder
              <Subheading02>대충 아직 없으니 적어달라는 문구</Subheading02>
            )}
          </ReviewList>
        </Content>
      </Wrapper>
      <EvaluationModifySheet
        isOpened={moreSheetItem !== undefined}
        onClose={() => {
          setMoreSheetItem(undefined)
        }}
        onReportClicked={handleReportEvaluation}
        onDeleteClicked={handleDeleteEvaluation}
        isModifiable={moreSheetItem?.is_modifiable ?? false}
        isReportable={moreSheetItem?.is_reportable ?? false}
      />
    </>
  )
}

const Wrapper = styled.div``

const AppBarContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 12px;
`

const Content = styled.div`
  padding: 0 20px 0 20px;
  display: flex;
  flex-direction: column;
`

const ReviewSummary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 12px 0 12px 0;
  border-bottom: solid 1px rgb(232, 232, 232);
`

const ReviewSummaryLeft = styled.div`
  display: flex;
  flex-direction: column;
`

const InstructorName = styled(Subheading02)`
  margin-top: 3px;
  color: rgb(119, 119, 119);
`

const ReviewSummaryRight = styled.div`
  display: flex;
  flex-direction: column;
`

const ReviewScore = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
`

const ReviewCount = styled(Detail)`
  margin-top: 3px;
  color: rgb(102, 102, 102);
`

const ReviewDiagram = styled.div`
  height: 330px;
  width: 290px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  text-align: center;
  align-self: center;
  padding: 8px 0 8px 0;
  margin-bottom: 10px;
`

const DiagramTop = styled.div``

const DiagramMiddle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
`

const DiagramBottom = styled.div`
  height: 28px;
`

const AxisLabel = styled.span`
  font-family: AppleSDGothicNeo;
  font-weight: bold;
  font-size: 10px;
  line-height: 11px;
`

const YAxisLabel = styled(AxisLabel)`
  margin-top: 20px;
`

const GraphWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const ReviewList = styled.div``
