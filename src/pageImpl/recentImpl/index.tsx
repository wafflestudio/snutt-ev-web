import styled from '@emotion/styled';

import { AppBar } from '@/lib/components/Appbar';
import { Title01, Title02 } from '@/lib/components/Text';
import { semesterToString } from '@/lib/util/semesterToString';

import { RecentLectureItem } from './__components__';
import { useLatestLectures } from './__containers__';

export const RecentImpl = () => {
  const { data: recentLectureData } = useLatestLectures();

  return (
    <Wrapper>
      <AppBar left={<AppBar.BackButton />}>
        <Title01 style={{ marginLeft: 12 }}>최근 강의 목록</Title01>
      </AppBar>
      <RecentLectureList>
        {recentLectureData &&
          (recentLectureData.length ? (
            recentLectureData.map(({ year, semester, lectures }) => {
              const title = `${year}년 ${semesterToString(semester)}학기`;

              return (
                <SemesterLectureWrapper key={title} data-testid="recent-semester">
                  <SemesterDivider data-testid="recent-semester-title">{title}</SemesterDivider>
                  {lectures.map((lecture) => (
                    <LectureItem content={lecture} key={lecture.id} />
                  ))}
                </SemesterLectureWrapper>
              );
            })
          ) : (
            <Title02 data-testid="recent-empty">최근 학기에 수강한 강의가 없습니다</Title02>
          ))}
      </RecentLectureList>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const RecentLectureList = styled.div``;

const SemesterDivider = styled(Title01)`
  background-color: ${({ theme }) => theme.colors.bg.divider};
  height: 40px;
  padding-left: 20px;
  line-height: 40px;
`;

const SemesterLectureWrapper = styled.div``;

const LectureItem = styled(RecentLectureItem)`
  &:not(:last-of-type) {
    border-bottom: solid 1px rgba(196, 196, 196, 0.3);
  }
`;
