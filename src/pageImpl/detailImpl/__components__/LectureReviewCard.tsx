import styled from '@emotion/styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { likeEvaluation, unlikeEvaluation } from '@/apis/ev';
import { SvgFossil } from '@/components/atoms/Icons/SvgFossil';
import SvgMaximize from '@/components/atoms/Icons/SvgMaximize';
import { SvgMoreVertical } from '@/components/atoms/Icons/SvgMoreVertical';
import { LikeButton } from '@/components/atoms/LikeButton';
import { Detail } from '@/components/atoms/Typography';
import { Rating } from '@/components/molecules/Rating';
import { CollapsableText } from '@/components/organisms/CollapsableText';
import { EvaluationDTO } from '@/dto/evaluation';
import { COLORS } from '@/styles/colors';
import { getOptimisticLikeButton } from '@/utils/getOptimisticLikeButton';
import { semesterToString } from '@/utils/semesterToString';

interface Props {
  isFetching: boolean;
  lectureId: number;
  review: EvaluationDTO;
  onMoreClick: () => void;
  onScoreDetailClick: () => void;
  isMyReview?: boolean;
}

export const LectureReviewCard = ({
  review,
  onMoreClick,
  isMyReview = false,
  onScoreDetailClick,
  lectureId,
  isFetching,
}: Props) => {
  const { mutate: toggleLike, isLoading: isMutating } = useToggleLikeEvaluation(
    review.id,
    review.is_liked,
    lectureId,
    isMyReview,
  );

  const { likeCount, likeByMe } = getOptimisticLikeButton(review.like_count, review.is_liked, isMutating);

  const onClickLike = () => {
    if (isMutating || isFetching) return;

    toggleLike();
  };

  return (
    <Wrapper isMintColor={isMyReview} data-testid="detail-evaluation-card">
      <Contents>
        <Header>
          <SideInfo>
            <Rating rating={review.rating} size={12} />
            <Semester>
              <SemesterText>
                {review.year}년 {semesterToString(review.semester)}학기
              </SemesterText>
            </Semester>

            {review.from_snuev && (
              <FossilIconWrapper>
                <SvgFossil />
              </FossilIconWrapper>
            )}

            <div style={{ flexGrow: 1 }} />

            <div onClick={onScoreDetailClick} data-testid="detail-evaluation-score-button">
              <SvgMaximize />
            </div>

            <MoreButtonWrapper onClick={onMoreClick} data-testid="detail-evaluation-more-button">
              <SvgMoreVertical />
            </MoreButtonWrapper>
          </SideInfo>
        </Header>
        {review.content === '' ? null : (
          <Review>
            <CollapsableText text={review.content} />
          </Review>
        )}

        <LikeWrapper>
          <LikeText>강의평이 도움이 되었나요?</LikeText>
          <LikeButton likeCount={likeCount} likebyMe={likeByMe} onClick={onClickLike} />
        </LikeWrapper>
      </Contents>
    </Wrapper>
  );
};

const useToggleLikeEvaluation = (id: number, liked: boolean, lectureId: number, isMyReview: boolean) => {
  const queryClient = useQueryClient();

  return useMutation(() => (liked ? unlikeEvaluation({ params: { id } }) : likeEvaluation({ params: { id } })), {
    onSuccess: () =>
      queryClient.invalidateQueries(isMyReview ? ['myLectureEvaluation', lectureId] : ['lectureEvaluation', lectureId]),
  });
};

const Wrapper = styled.div<{ isMintColor: boolean }>`
  width: calc(100% + 40px);
  box-sizing: border-box;
  margin-left: -20px;
  background-color: ${(props) => props.isMintColor && 'rgba(27, 208, 200, 0.05)'};
`;

const Contents = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  margin: 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.divider};
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Semester = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SemesterText = styled(Detail)`
  color: ${COLORS.darkGray};
  text-align: left;
  font-size: 10px;
  margin-left: 8px;
  line-height: 18px;
`;

const FossilIconWrapper = styled.div`
  margin-left: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SideInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Review = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: 12px;
`;

const MoreButtonWrapper = styled.div`
  margin-left: 12px;
`;

const LikeWrapper = styled.div`
  margin-top: 12px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LikeText = styled.p`
  margin: 8px 0;
  font-size: 10px;
  line-height: 11px;
  color: ${({ theme }) => theme.colors.text.desc};
`;
