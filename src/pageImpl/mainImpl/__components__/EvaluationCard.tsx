import styled from '@emotion/styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { likeEvaluation, unlikeEvaluation } from '@/lib/apis/ev';
import { CollapsableText } from '@/lib/components/CollapsableText';
import { LikeButton } from '@/lib/components/Miscellaneous/LikeButton';
import { Rating } from '@/lib/components/Rating';
import { Detail, Subheading01 } from '@/lib/components/Text';
import { MainEvaluationDTO } from '@/lib/dto/mainEvaluation';
import { LIKE_FEATURE } from '@/lib/features/flags';
import { COLORS } from '@/lib/styles/colors';
import { semesterToString } from '@/lib/util/semesterToString';

interface Props {
  selectedTagId?: number;
  evaluation: MainEvaluationDTO;
}

export const EvaluationCard = ({ evaluation, selectedTagId }: Props) => {
  const router = useRouter();

  const { isLoading: isMutating, mutate: toggleLike } = useToggleLikeEvaluation(
    evaluation.id,
    evaluation.is_liked,
    selectedTagId,
  );

  const goToEvaluation = () => {
    const query = new URLSearchParams();
    query.set('id', `${evaluation.lecture.id}`);
    router.push(`/detail?${query}`);
  };

  const onClickLike = () => {
    if (isMutating) return;

    toggleLike();
  };

  return (
    <Wrapper data-testid="main-evaluation-card">
      <Contents>
        <Header onClick={goToEvaluation}>
          <HeaderLeft>
            <LectureName>{evaluation.lecture.title}</LectureName>
            <RatingSemester>
              <Rating rating={evaluation.rating} size={12} />
              <Semester>
                {evaluation.year}년 {semesterToString(evaluation.semester)}
                학기
              </Semester>
            </RatingSemester>
          </HeaderLeft>
          <HeaderRight>{evaluation.lecture.instructor}</HeaderRight>
        </Header>
        <Review>
          <CollapsableText text={evaluation.content} />
        </Review>

        {LIKE_FEATURE && (
          <LikeWrapper>
            <LikeText>강의평이 도움이 되었나요?</LikeText>
            <LikeButton likeCount={evaluation.like_count} likebyMe={evaluation.is_liked} onClick={onClickLike} />
          </LikeWrapper>
        )}
      </Contents>
    </Wrapper>
  );
};

const useToggleLikeEvaluation = (id: number, liked: boolean, selectedTagId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation(() => (liked ? unlikeEvaluation({ params: { id } }) : likeEvaluation({ params: { id } })), {
    onSuccess: () => {
      queryClient.invalidateQueries(['tagEvaluations', selectedTagId]);
    },
  });
};

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 20px 0px 20px;
  box-sizing: border-box;
`;

const Contents = styled.div`
  border-bottom: 1px solid ${COLORS.gray};
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  cursor: pointer;
`;

const HeaderLeft = styled.div``;

const HeaderRight = styled(Detail)`
  color: rgb(119, 119, 119);
  max-width: 30%;
  text-align: right;
  word-break: keep-all;
  margin-left: 10px;
`;

const LectureName = styled(Subheading01)``;

const Semester = styled(Detail)`
  color: ${COLORS.darkGray};
  text-align: left;
  font-size: 11px;
  margin-left: 8px;
  line-height: 100%;
`;

const RatingSemester = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 3px;
  align-items: center;
`;

const Review = styled.div``;

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
