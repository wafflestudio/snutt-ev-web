import styled from '@emotion/styled';

import { CollapsableText } from '@/lib/components/CollapsableText';
import { SvgFossil } from '@/lib/components/Icons/SvgFossil';
import SvgMaximize from '@/lib/components/Icons/SvgMaximize';
import { SvgMoreVertical } from '@/lib/components/Icons/SvgMoreVertical';
import { LikeButton } from '@/lib/components/Miscellaneous/LikeButton';
import { Rating } from '@/lib/components/Rating';
import { Detail } from '@/lib/components/Text';
import { EvaluationDTO } from '@/lib/dto/evaluation';
import { LIKE_FEATURE } from '@/lib/features/flags';
import { COLORS } from '@/lib/styles/colors';
import { semesterToString } from '@/lib/util/semesterToString';

interface Props {
  review: EvaluationDTO;
  onMoreClick: () => void;
  onScoreDetailClick: () => void;
  isMyReview?: boolean;
}

export const LectureReviewCard = ({ review, onMoreClick, isMyReview = false, onScoreDetailClick }: Props) => {
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

            <MoreButtonWrapper onClick={onMoreClick}>
              <SvgMoreVertical />
            </MoreButtonWrapper>
          </SideInfo>
        </Header>
        {review.content === '' ? null : (
          <Review>
            <CollapsableText text={review.content} />
          </Review>
        )}

        {LIKE_FEATURE && (
          <LikeWrapper>
            <LikeText>강의평이 도움이 되었나요?</LikeText>
            <LikeButton likeCount={1} />
          </LikeWrapper>
        )}
      </Contents>
    </Wrapper>
  );
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
  border-bottom: 1px solid ${COLORS.gray};
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
