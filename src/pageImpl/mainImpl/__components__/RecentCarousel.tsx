import styled from '@emotion/styled';
import Link from 'next/link';

import { Subheading02, Title01 } from '@/lib/components/Text';
import { LatestLectureDTO } from '@/lib/dto/core/latestLecture';

import { LectureCard } from './LectureCard';

interface Props {
  lectureList: LatestLectureDTO[];
}

export const RecentCarousel = ({ lectureList }: Props) => {
  return (
    <Wrapper data-testid="main-recent">
      <CarouselHeader>
        <Title01>지난 학기 강의평을 남겨주세요</Title01>
        <Link href="/recent" passHref>
          <RecentLink>
            <Subheading02>더보기 &gt;</Subheading02>
          </RecentLink>
        </Link>
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
  border-bottom: 12px solid rgb(0, 0, 0, 0.03);
  padding: 0 20px 20px 20px;
`;

const RecentLink = styled.a`
  text-decoration: none;
`;

const CarouselHeader = styled.div`
  margin-bottom: 10px;
  margin-top: 11px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
