import styled from '@emotion/styled';
import Link from 'next/link';

import SvgChevron from '@/lib/components/Icons/SvgChevronRight';
import { Subheading02, Title01 } from '@/lib/components/Text';
import { LatestLectureDTO } from '@/lib/dto/latestLecture';

import { LectureCard } from './LectureCard';

interface Props {
  lectureList: LatestLectureDTO[];
}

export const RecentCarousel = ({ lectureList }: Props) => {
  return (
    <Wrapper data-testid="main-recent">
      <CarouselHeader>
        <Title01>지난 학기 강의평을 남겨주세요</Title01>
        <RecentLink href="/recent">
          <RecentLinkText data-testid="main-recent-more-link">
            강의 목록 <SvgChevron />
          </RecentLinkText>
        </RecentLink>
      </CarouselHeader>
      <SubjectCardCarousel>
        {lectureList.map((lecture) => (
          <LectureCard key={lecture.id} lecture={lecture} />
        ))}
      </SubjectCardCarousel>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-bottom: 12px solid ${({ theme }) => theme.colors.bg.divider};
  padding: 0 20px 20px 20px;
`;

const RecentLink = styled(Link)`
  text-decoration: none;
`;

const RecentLinkText = styled(Subheading02)`
  color: #777777;
`;

const CarouselHeader = styled.div`
  margin-bottom: 10px;
  margin-top: 11px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SubjectCardCarousel = styled.div`
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;
  width: calc(100% + 40px);
  margin-left: -20px;
  ::-webkit-scrollbar {
    display: none;
  }
`;
