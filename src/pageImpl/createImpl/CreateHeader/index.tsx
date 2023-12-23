import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import { fetchSemesterLectures } from '@/apis/ev';
import SvgArrowDown from '@/components/atoms/Icons/SvgArrowDown';
import { Subheading02, Title01 } from '@/components/atoms/Typography';
import { SemesterLectureDTO } from '@/dto/semesterLecture';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { semesterToString } from '@/utils/semesterToString';

interface Props {
  lectureId: number;
  selectedSemesterId?: SemesterLectureDTO['id'];
  onChangeSelectedSemester: (semesterId: SemesterLectureDTO['id']) => void;
}

export const CreateHeader = ({ lectureId, selectedSemesterId, onChangeSelectedSemester }: Props) => {
  const { data: semesterLectures } = useSemesterLectures(lectureId);
  const [isSemesterSelectorOpen, setIsSemesterSelectorOpen] = useState(false);
  const semesterListRef = useRef<HTMLDivElement>(null);

  useOutsideClick({ ref: semesterListRef, handler: () => setIsSemesterSelectorOpen(false) });

  useEffect(() => {
    if (!semesterLectures || selectedSemesterId || semesterLectures.semester_lectures.length === 0) return;
    onChangeSelectedSemester(semesterLectures.semester_lectures[0].id);
  }, [semesterLectures, selectedSemesterId, onChangeSelectedSemester]);

  const lectureName = semesterLectures?.title;
  const lectureInstructor = semesterLectures?.instructor;
  const lectureCredit = semesterLectures?.credit;
  const lectureClassification = semesterLectures?.classification;
  const selectedSemester = semesterLectures?.semester_lectures?.find((s) => s.id === selectedSemesterId);

  const handleSemesterSelector = () => {
    setIsSemesterSelectorOpen((status) => !status);
  };

  const handleSelectedSemester = (semesterLecture: SemesterLectureDTO) => {
    onChangeSelectedSemester(semesterLecture.id);
    setIsSemesterSelectorOpen((status) => !status);
  };

  return (
    <Container>
      <Column>
        <LectureName data-testid="create-header-lecture-name">{lectureName}</LectureName>
        <LectureInstructor data-testid="create-header-lecture-detail">
          {lectureInstructor} / {lectureCredit}학점 ({lectureClassification})
        </LectureInstructor>
      </Column>
      <SelectorWrapper>
        <SemesterSelectorContainer ref={semesterListRef}>
          <SemesterSelector onClick={handleSemesterSelector} data-testid="create-header-semester-button">
            {selectedSemester
              ? `${selectedSemester.year}-${semesterToString(selectedSemester.semester)}학기`
              : '수강학기'}
            <SvgArrowDown width="10" />
          </SemesterSelector>

          {isSemesterSelectorOpen && (
            <SemesterButtonsContainer data-testid="create-header-semester-list">
              {semesterLectures?.semester_lectures?.map((lecture) => (
                <SemesterButton
                  key={lecture.id}
                  onClick={() => handleSelectedSemester(lecture)}
                  data-testid="create-header-semester-listitem"
                >
                  {`${lecture.year}-${semesterToString(lecture.semester)}학기`}
                </SemesterButton>
              ))}
            </SemesterButtonsContainer>
          )}
        </SemesterSelectorContainer>
      </SelectorWrapper>
    </Container>
  );
};

const useSemesterLectures = (id: number) =>
  useQuery(['lectureSemester', id], () => fetchSemesterLectures({ params: { id } }), {
    enabled: !isNaN(id),
  });

const Container = styled.div`
  padding: 10px 0;
  z-index: 2;

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.divider};
`;

const Column = styled.div`
  width: calc(100% - 130px);
`;

const LectureName = styled(Title01)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const LectureInstructor = styled(Subheading02)`
  margin-top: 3px;
  color: rgb(119, 119, 119);

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SelectorWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 34px;
  margin-left: 10px;
`;

const SemesterSelectorContainer = styled.div`
  position: absolute;
  top: 0;

  border: 1px solid #c4c4c4;
  border-radius: 6px;

  width: 100%;
  background: ${({ theme }) => theme.colors.bg.form};
  align-self: center;
`;

const SemesterSelector = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.bg.form};
  color: ${({ theme }) => theme.colors.text.default};
  box-sizing: border-box;
  border: none;
  border-radius: 6px;
  font-family: AppleSDGothicNeo;

  width: 117px;
  height: 32px;
  font-size: 13px;
  line-height: 15px;
  padding: 8px 10px;
`;

const SemesterButtonsContainer = styled.div`
  max-height: 200px;
  overflow-y: scroll;

  background: ${({ theme }) => theme.colors.bg.form};
`;

const SemesterButton = styled.button`
  font-family: AppleSDGothicNeo;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 15.5px;
  width: 100%;
  height: 34px;

  display: flex;
  align-items: center;
  padding: 8px 14px;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.default};
`;
