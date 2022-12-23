import styled from '@emotion/styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { likeEvaluation, unlikeEvaluation } from '@/apis/ev';
import { LikeButton } from '@/components/atoms/LikeButton';
import { Detail, Subheading01 } from '@/components/atoms/Typography';
import { Rating } from '@/components/molecules/Rating';
import { CollapsableText } from '@/components/organisms/CollapsableText';
import { MainEvaluationDTO } from '@/dto/mainEvaluation';
import { COLORS } from '@/styles/colors';
import { getOptimisticLikeButton } from '@/utils/getOptimisticLikeButton';
import { semesterToString } from '@/utils/semesterToString';

interface Props {
  evaluation: MainEvaluationDTO;
}

export const MyEvaluationCard = ({ evaluation }: Props) => {
  const router = useRouter();

  const { isLoading: isMutating, mutate: toggleLike } = useToggleLikeEvaluation(evaluation.id, evaluation.is_liked);

  const { likeByMe, likeCount } = getOptimisticLikeButton(evaluation.like_count, evaluation.is_liked, isMutating);

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
    <Wrapper data-testid="my-evaluations-evaluation-card">
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

        <LikeWrapper>
          <LikeText>강의평이 도움이 되었나요?</LikeText>
          <LikeButton likeCount={likeCount} likebyMe={likeByMe} onClick={onClickLike} />
        </LikeWrapper>
      </Contents>
    </Wrapper>
  );
};

const useToggleLikeEvaluation = (id: number, liked: boolean) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => (liked ? unlikeEvaluation({ params: { id } }) : likeEvaluation({ params: { id } })),
    onSuccess: () => queryClient.invalidateQueries(['evaluations', 'list', 'my']),
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
