import styled from '@emotion/styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

import FossilIcon from '@/assets/icons/fossil.svg';
import { deleteEvaluation, postReportEvaluation } from '@/lib/apis/ev';
import SvgStarSmallEmpty from '@/lib/components/Icons/SvgStarSmallEmpty';
import SvgStarSmallFilled from '@/lib/components/Icons/SvgStarSmallFilled';
import { EmptyReviewPlaceholder } from '@/lib/components/Miscellaneous/EmptyReviewPlaceholder';
import { SearchResultLoading } from '@/lib/components/Miscellaneous/Loading';
import { Detail, Subheading02, Title01 } from '@/lib/components/Text';
import { RatingTooltip } from '@/lib/components/Tooltip';
import { EvaluationDTO } from '@/lib/dto/evaluation';
import useScrollLoader from '@/lib/hooks/useScrollLoader';
import { COLORS } from '@/lib/styles/colors';
import { useLectureEvaluationsContainer } from '@/pageImpl/detailImpl/__containers__/useLectureEvaluationsContainer';

import { DeleteEvaluationDialog } from './__components__/DeleteEvaluationDialog';
import { DetailAppBar } from './__components__/DetailAppBar';
import { EvaluationDetailScore } from './__components__/EvaluationDetailScore';
import EvaluationModifySheet from './__components__/EvaluationModifySheet';
import { EvaluationScoreDialog } from './__components__/EvaluationScoreDialog';
import { LectureReviewCard } from './__components__/LectureReviewCard';
import { ReportEvaluationDialog } from './__components__/ReportEvaluationDialog';
import { useEvaluationSummaryContainer } from './__containers__/useEvaluationSummaryContainer';
import { useMyLectureEvaluationsContainer } from './__containers__/useMyLectureEvaluationsContainer';

export const DetailImpl = () => {
  const router = useRouter();
  const { id } = router.query;

  const { summaryData } = useEvaluationSummaryContainer(Number(id));
  const { searchResult, fetchNextPage, isFetchingNextPage, hasNextPage } = useLectureEvaluationsContainer(Number(id));
  const { myReviewResult } = useMyLectureEvaluationsContainer(Number(id));
  const { loaderRef } = useScrollLoader(fetchNextPage);

  const queryClient = useQueryClient();

  const [moreSheetItem, setMoreSheetItem] = useState<EvaluationDTO>();
  const [scoreDetailPopupItemId, setScoreDetailPopupItemId] = useState<number>();

  const deleteMutation = useMutation((id: number) => deleteEvaluation({ params: { id } }), {
    onSuccess: () => {
      queryClient.invalidateQueries(['evaluationSummary', Number(id)]);
      queryClient.invalidateQueries(['myLectureEvaluation', Number(id)]);
      queryClient.invalidateQueries(['lectureEvaluation', Number(id)]);
    },
    onError: () => {
      console.error('강의평 삭제에 실패하였습니다.');
    },
  });
  const [deleteTargetId, setDeleteTargetId] = useState<number | undefined>(undefined);
  const handleDeleteEvaluation = () => {
    setDeleteTargetId(moreSheetItem?.id);
    setMoreSheetItem(undefined);
  };
  const handleDeleteEvaluationConfirm = async () => {
    const target = deleteTargetId;
    setDeleteTargetId(undefined);
    if (target !== undefined) {
      deleteMutation.mutate(target);
    }
  };

  const reportMutation = useMutation(
    ({ id, content }: { id: number; content: string }) => postReportEvaluation({ params: { id }, body: { content } }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['evaluationSummary']);
        queryClient.invalidateQueries(['lectureEvaluation']);
      },
      onError: () => {
        console.error('강의평 신고에 실패하였습니다.');
      },
    },
  );
  const [reportTargetId, setReportTargetId] = useState<number | undefined>(undefined);
  const handleReportEvaluation = () => {
    setReportTargetId(moreSheetItem?.id);
    setMoreSheetItem(undefined);
  };
  const handleReportEvaluationConfirm = async (r: string) => {
    const target = reportTargetId;
    setReportTargetId(undefined);
    if (target !== undefined) {
      reportMutation.mutate({ id: target, content: r });
    }
  };

  const count = searchResult?.pages[searchResult?.pages.length - 1].total_count;
  const isEmpty = count === 0 && myReviewResult?.evaluations.length === 0;
  const showSnuevWarning = !isEmpty && !summaryData?.evaluation?.avg_life_balance;
  const myLectureEvaluations = myReviewResult?.evaluations;
  const lectureEvaluations = searchResult?.pages?.flatMap((page) => page.content);
  const scoreDetailPopupItem = [...(myLectureEvaluations ?? []), ...(lectureEvaluations ?? [])].find(
    (item) => item.id === scoreDetailPopupItemId,
  );

  return (
    <>
      <Wrapper>
        <DetailAppBar id={Number(id)} />

        <Content>
          <ReviewSummary>
            <ReviewSummaryLeft>
              <Title01>{summaryData?.title}</Title01>
              <InstructorName>
                {summaryData?.instructor} / {summaryData?.credit}학점 ({summaryData?.classification})
              </InstructorName>
            </ReviewSummaryLeft>
            <ReviewSummaryRight>
              <ReviewScore>
                {isEmpty ? <SvgStarSmallEmpty height={19} width={19} /> : <SvgStarSmallFilled height={19} width={19} />}
                <Title01 style={{ marginLeft: 6, marginTop: 0 }}>
                  {summaryData?.evaluation?.avg_rating?.toFixed(1)}
                </Title01>
              </ReviewScore>
              <ReviewCount>{count}개의 강의평</ReviewCount>
            </ReviewSummaryRight>
          </ReviewSummary>

          {showSnuevWarning && (
            <SnuevWarning>
              <FossilIcon />
              <SnuevWarningText>와플스튜디오에서 발굴한 옛 강의평은 세부 항목 점수가 없습니다.</SnuevWarningText>
            </SnuevWarning>
          )}

          {isEmpty ? (
            <EmptyReviewPlaceholder />
          ) : (
            <EvaluationDetail>
              <PositionedRatingToolTip>
                <RatingTooltip />
              </PositionedRatingToolTip>
              <EvaluationDetailScore
                score={{
                  gains: summaryData?.evaluation.avg_gains ?? null,
                  grade_satisfaction: summaryData?.evaluation.avg_grade_satisfaction ?? null,
                  life_balance: summaryData?.evaluation.avg_life_balance ?? null,
                  teaching_skill: summaryData?.evaluation.avg_teaching_skill ?? null,
                }}
                isSnuevWarning={showSnuevWarning}
              />

              {myLectureEvaluations && lectureEvaluations && (
                <ReviewList>
                  {myLectureEvaluations.map((content) => (
                    <LectureReviewCard
                      review={content}
                      key={content.id}
                      onMoreClick={() => setMoreSheetItem(content)}
                      onScoreDetailClick={() => setScoreDetailPopupItemId(content.id)}
                      isMyReview
                    />
                  ))}
                  <>
                    {lectureEvaluations.map((it) => (
                      <LectureReviewCard
                        review={it}
                        key={it.id}
                        onMoreClick={() => setMoreSheetItem(it)}
                        onScoreDetailClick={() => setScoreDetailPopupItemId(it.id)}
                      />
                    ))}
                    {hasNextPage && !isFetchingNextPage && <div ref={loaderRef} />}
                    {isFetchingNextPage && <SearchResultLoading />}
                  </>
                </ReviewList>
              )}
            </EvaluationDetail>
          )}
        </Content>
      </Wrapper>
      <DeleteEvaluationDialog
        isOpen={deleteTargetId !== undefined}
        close={() => setDeleteTargetId(undefined)}
        confirmDelete={handleDeleteEvaluationConfirm}
      />
      <ReportEvaluationDialog
        isOpen={reportTargetId !== undefined}
        close={() => setReportTargetId(undefined)}
        report={handleReportEvaluationConfirm}
      />
      <EvaluationScoreDialog
        isOpen={scoreDetailPopupItemId !== undefined}
        close={() => setScoreDetailPopupItemId(undefined)}
        evaluation={scoreDetailPopupItem}
      />
      <EvaluationModifySheet
        isOpened={moreSheetItem !== undefined}
        onClose={() => setMoreSheetItem(undefined)}
        onReportClicked={handleReportEvaluation}
        onDeleteClicked={handleDeleteEvaluation}
        isModifiable={moreSheetItem?.is_modifiable ?? false}
        isReportable={moreSheetItem?.is_reportable ?? false}
      />
    </>
  );
};

const Wrapper = styled.div``;

const Content = styled.div`
  padding: 0 20px 0 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const EvaluationDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  position: relative;
`;

const ReviewSummary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 10px 0 10px 0;
  border-bottom: solid 1px rgb(232, 232, 232);
`;

const ReviewSummaryLeft = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;

const InstructorName = styled(Subheading02)`
  margin-top: 3px;
  color: rgb(119, 119, 119);
`;

const ReviewSummaryRight = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewScore = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
`;

const ReviewCount = styled(Detail)`
  margin-top: 3px;
  color: rgb(102, 102, 102);
  white-space: nowrap;
`;

const ReviewList = styled.div``;

const PositionedRatingToolTip = styled.div`
  top: 10px;
  right: 0;
  position: absolute;
`;

const SnuevWarning = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 18px;
  margin: 8px 0 8px 0;
`;

const SnuevWarningText = styled.div`
  font-size: 8px;
  color: ${COLORS.darkGray};
  margin-left: 5px;
  font-family: AppleSDGothicNeo;
`;
