import styled from '@emotion/styled';

import SvgArrowDown from '@/lib/components/Icons/SvgArrowDown';
import { Subheading02, Title01 } from '@/lib/components/Text';
import { SemesterLectureDTO } from '@/lib/dto/core/semesterLecture';
import { SemesterIntToString } from '@/lib/util';

interface Props {
  lectureName?: string;
  lectureInstructor?: string;
  lectureCredit?: number;
  lectureClassification?: string;
  handleSelectedSemester: (semesterLecture: SemesterLectureDTO) => void;
  handleSemesterSelector: () => void;
  isSemesterSelectorOpen: boolean;
  selectedSemester?: SemesterLectureDTO;
  lectureSemesters?: SemesterLectureDTO[];
}

export const Header = ({
  lectureName,
  lectureInstructor,
  lectureCredit,
  lectureClassification,
  handleSelectedSemester,
  handleSemesterSelector,
  selectedSemester,
  isSemesterSelectorOpen,
  lectureSemesters,
}: Props) => {
  return (
    <Container>
      <Column
        style={{
          maxWidth: '200px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          wordWrap: 'break-word',
          whiteSpace: 'nowrap',
          WebkitLineClamp: 1,
          marginTop: '10px',
        }}
      >
        <LectureName>{lectureName}</LectureName>
        <LectureInstructor>
          {lectureInstructor} / {lectureCredit}학점 ({lectureClassification})
        </LectureInstructor>
      </Column>
      <SelectorWrapper>
        <SemesterSelectorContainer>
          <SemesterSelector onClick={handleSemesterSelector}>
            {selectedSemester
              ? `${selectedSemester.year}-${SemesterIntToString(
                  selectedSemester.semester,
                )}학기`
              : ''}

            <SvgArrowDown width="10" />
          </SemesterSelector>
          {isSemesterSelectorOpen && (
            <SemesterButtonsContainer>
              {lectureSemesters?.map((lecture) => (
                <SemesterButton
                  key={lecture.id}
                  onClick={() => handleSelectedSemester(lecture)}
                >
                  {`${lecture.year}-${SemesterIntToString(
                    lecture.semester,
                  )}학기`}
                </SemesterButton>
              ))}
            </SemesterButtonsContainer>
          )}
        </SemesterSelectorContainer>
      </SelectorWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  width: 100%;
  min-height: 58.5px;
  border-bottom: 1px solid #f2f2f2;
  //padding: 10px 0px 0px 0px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const SemesterSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #c4c4c4;
  border-radius: 6px;
  margin-top: 10px;
  height: fit-content;
  width: fit-content;
  background-color: #ffffff;
  margin-left: 10px;
  align-self: center;
`;

const LectureName = styled(Title01)`
  white-space: normal;
`;

const LectureInstructor = styled(Subheading02)`
  margin-top: 3px;
  margin-bottom: 10px;
  color: rgb(119, 119, 119);
`;

const SelectorWrapper = styled.div`
  position: absolute;
  right: 20px;
  z-index: 10;
`;

const SemesterSelector = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  box-sizing: border-box;
  border: none;
  border-radius: 6px;
  font-family: AppleSDGothicNeo;

  width: 117px;
  height: 32px;
  font-size: 13px;
  line-height: 15px;
  padding: 8px 14px;
`;

const SemesterButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  max-height: 200px;
  overflow-y: scroll;
  background-color: #ffffff;
`;

const SemesterButton = styled.button`
  font-family: AppleSDGothicNeo;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 15.5px;
  width: 117px;
  height: 32px;
  display: flex;
  align-items: center;
  padding: 8px 14px;
  border: none;
  background-color: transparent;
`;
