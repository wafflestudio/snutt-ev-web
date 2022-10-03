import styled from '@emotion/styled';
import { Router, useRouter } from 'next/router';
import { useState } from 'react';

import FossilIcon from '@/assets/icons/fossil.svg';
import { EmptyReviewPlaceholder } from '@/lib/components/Miscellaneous/EmptyReviewPlaceholder';
import { SearchResultLoading } from '@/lib/components/Miscellaneous/Loading';
import { RatingTooltip } from '@/lib/components/Tooltip';
import useScrollLoader from '@/lib/hooks/useScrollLoader';
import { COLORS } from '@/lib/styles/colors';

import {
  DeleteEvaluationDialog,
  DetailAppBar,
  EvaluationDetailScore,
  EvaluationModifySheet,
  EvaluationScoreDialog,
  LectureEvaluationSummary,
  LectureReviewCard,
  ReportEvaluationDialog,
} from './__components__';
import {
  useDeleteEvaluation,
  useEvaluationSummary,
  useLectureEvaluations,
  useLectureMyEvaluations,
  useReportEvaluation,
} from './__queries__';

export const DetailImpl = () => {
  const router = useRouter();
  const lectureId = Number(router.query.id);

  const { data: summaryData } = useEvaluationSummary(lectureId);
  const { data: myReviewResult } = useLectureMyEvaluations(lectureId);
  const { data: searchResult, fetchNextPage, isFetchingNextPage, hasNextPage } = useLectureEvaluations(lectureId);

  const { mutateAsync: deleteEvaluation } = useDeleteEvaluation(lectureId);
  const { mutateAsync: reportEvaluation } = useReportEvaluation(lectureId);

  const { loaderRef } = useScrollLoader(fetchNextPage);

  const [moreSheetItemId, setMoreSheetItemId] = useState<number>();
  const [deleteTargetId, setDeleteTargetId] = useState<number>();
  const [reportTargetId, setReportTargetId] = useState<number>();
  const [scoreDetailPopupItemId, setScoreDetailPopupItemId] = useState<number>();

  const count = searchResult?.pages[searchResult?.pages.length - 1].total_count;
  const isEmpty = count === 0 && myReviewResult?.evaluations.length === 0;
  const showSnuevWarning = !isEmpty && !summaryData?.evaluation?.avg_life_balance;
  const myLectureEvaluations = myReviewResult?.evaluations;
  const lectureEvaluations = searchResult?.pages?.flatMap((page) => page.content);
  const allEvaluations = [...(myLectureEvaluations ?? []), ...(lectureEvaluations ?? [])];
  const moreSheetItem = allEvaluations.find((item) => item.id === moreSheetItemId);
  const scoreDetailPopupItem = allEvaluations.find((item) => item.id === scoreDetailPopupItemId);

  const handleDeleteEvaluation = () => {
    setDeleteTargetId(moreSheetItemId);
    setMoreSheetItemId(undefined);
  };
  const handleDeleteEvaluationConfirm = async () => {
    if (deleteTargetId === undefined) return;
    await deleteEvaluation(deleteTargetId);
    setDeleteTargetId(undefined);
  };
  const handleReportEvaluation = () => {
    setReportTargetId(moreSheetItemId);
    setMoreSheetItemId(undefined);
  };
  const handleReportEvaluationConfirm = async (content: string) => {
    if (reportTargetId === undefined) return;
    await reportEvaluation({ id: reportTargetId, content });
    setReportTargetId(undefined);
  };

  const goBack = () => {
    if (((router as Router).components['/detail'] as { initial?: true }).initial) {
      router.replace('/main');
    } else {
      router.back();
    }
  };

  return (
    <Wrapper>
      <DetailAppBar id={lectureId} goBack={goBack} />

      <Content>
        <LectureEvaluationSummary summaryData={summaryData} isEmpty={isEmpty} count={count} />

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

            <ReviewList>
              {myLectureEvaluations?.map((content) => (
                <LectureReviewCard
                  review={content}
                  key={content.id}
                  onMoreClick={() => setMoreSheetItemId(content.id)}
                  onScoreDetailClick={() => setScoreDetailPopupItemId(content.id)}
                  isMyReview
                />
              ))}
              <>
                {lectureEvaluations?.map((it) => (
                  <LectureReviewCard
                    review={it}
                    key={it.id}
                    onMoreClick={() => setMoreSheetItemId(it.id)}
                    onScoreDetailClick={() => setScoreDetailPopupItemId(it.id)}
                  />
                ))}
                {hasNextPage && !isFetchingNextPage && <div ref={loaderRef} />}
                {isFetchingNextPage && <SearchResultLoading />}
              </>
            </ReviewList>
          </EvaluationDetail>
        )}
      </Content>

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
        isOpened={moreSheetItemId !== undefined}
        onClose={() => setMoreSheetItemId(undefined)}
        onReportClicked={handleReportEvaluation}
        onDeleteClicked={handleDeleteEvaluation}
        isModifiable={moreSheetItem?.is_modifiable ?? false}
        isReportable={moreSheetItem?.is_reportable ?? false}
      />
    </Wrapper>
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
