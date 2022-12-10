import styled from '@emotion/styled';

import SvgStarSmallEmpty from '@/components/atoms/Icons/SvgStarSmallEmpty';
import SvgStarSmallFilled from '@/components/atoms/Icons/SvgStarSmallFilled';
import SvgWarning from '@/components/atoms/Icons/SvgWarning';
import { Detail, Title02 } from '@/components/atoms/Typography';
import { resetMarPad } from '@/styles';
import { COLORS } from '@/styles/colors';

interface Props {
  handleRating: (rating: number) => void;
  rating: number | undefined;
  content: string;
  handleContent: (content: string) => void;
  isContentValid: boolean;
}

const RATINGS = Array(5).fill({
  empty: <SvgStarSmallEmpty width={30} height={30} />,
  filled: <SvgStarSmallFilled width={30} height={30} />,
});

const placeholder = '강의에 대한 솔직한 리뷰를 남겨주세요. \nex) 과제, 출석, 교수님, 시험 난이도, 팀플 유무 등';

export const CreateContentStep = ({ handleRating, rating = -1, handleContent, content, isContentValid }: Props) => {
  return (
    <>
      <Container>
        <Title02>별점</Title02>
        <SubTitle>수업에 대한 별점을 남겨주세요.</SubTitle>
        <RatingContainer>
          {RATINGS.map(({ empty, filled }, index) => (
            <RatingButton key={index} onClick={() => handleRating(index)} data-testid="create-rating-star">
              {rating < index ? empty : filled}
            </RatingButton>
          ))}
        </RatingContainer>
        <ContentTextarea
          data-testid="create-content-input"
          value={content}
          onChange={(e) => handleContent(e.target.value)}
          placeholder={placeholder}
        />
      </Container>
      {!isContentValid && (
        <WarningContainer>
          <SvgWarning color={COLORS.red} width={15} height={15} style={{ marginRight: '2px', marginTop: '2px' }} />
          <Detail style={{ color: COLORS.red }}>강의평을 30자 이상 남겨주세요</Detail>
        </WarningContainer>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 408px;
  padding-top: 28px;
`;

const SubTitle = styled.p`
  ${resetMarPad}
  font-family: AppleSDGothicNeo;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 12px;
  color: #b3b3b3;
  margin-top: 7px;
`;

const RatingContainer = styled.div`
  display: flex;
  margin-top: 4px;
  margin-bottom: 24px;
`;

const RatingButton = styled.button`
  background-color: transparent;
  border: none;
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  height: 400px;
  background-color: ${({ theme }) => theme.colors.bg.form};
  border: 1px solid rgba(98, 98, 98, 0.5);
  box-sizing: border-box;
  border-radius: 12px;
  font-family: AppleSDGothicNeo;
  font-size: 14px;
  line-height: 19px;
  padding: 12px;
  overflow-y: scroll;
  color: ${({ theme }) => theme.colors.text.form};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.desc};
  }
`;

const WarningContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 2px;
`;
