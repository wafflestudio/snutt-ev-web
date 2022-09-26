import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { AppBar } from '@/lib/components/Appbar';
import SvgArrowBack from '@/lib/components/Icons/SvgArrowBack';
import { Title01, Title02 } from '@/lib/components/Text';
import { semesterToString } from '@/usecases/lecture/semesterToString';

import { RecentLectureItem } from './__components__/RecentResultItem';
import { useLatestLectures } from './__containers__';

export const RecentImpl = () => {
  const router = useRouter();

  const { data: recentLectureData } = useLatestLectures();

  return (
    <Wrapper>
      <AppBar
        leftImage={
          <BackButton onClick={() => router.back()}>
            <SvgArrowBack width={30} height={30} />
          </BackButton>
        }
      >
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
                    <RecentLectureItem content={lecture} key={lecture.id} />
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

const BackButton = styled.button`
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  padding: 0;
`;

const RecentLectureList = styled.div``;

const SemesterDivider = styled(Title01)`
  background-color: rgba(0, 0, 0, 0.03);
  height: 40px;
  padding-left: 20px;
  line-height: 40px;
`;

const SemesterLectureWrapper = styled.div``;
