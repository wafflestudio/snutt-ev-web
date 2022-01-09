import styled from "@emotion/styled"
import { Subheading02, Title01 } from "@lib/components/Text"
import { RecentLectureDTO } from "@lib/dto/recentLecture"
import { LectureSemesterDTO } from "@lib/dto/semeters"
import SvgArrowDown from "@lib/components/Icons/SvgArrowDown"

interface Props {
  lecture: RecentLectureDTO
  handleSelectedSemester: (semester: string) => void
  handleSemesterSelector: () => void
  isSemesterSelectorOpen: boolean
  selectedSemester: string
  lectureSemesters?: LectureSemesterDTO[]
}

export const Header = ({
  lecture,
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
          maxWidth: "200px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          wordWrap: "break-word",
          whiteSpace: "nowrap",
          WebkitLineClamp: 1,
          marginTop: "10px",
        }}
      >
        <Title01>{lecture.name}야야ㄴㄹㄴㄹ야</Title01>
        <Subheading02>{lecture.lecturer}</Subheading02>
      </Column>
      <SemesterSelectorContainer>
        <SemesterSelector onClick={handleSemesterSelector}>
          {selectedSemester || lecture.semester}
          <SvgArrowDown width="10" />
        </SemesterSelector>
        {isSemesterSelectorOpen && (
          <SemesterButtonsContainer>
            {lectureSemesters?.map((lecture) => (
              <SemesterButton
                key={lecture.id}
                onClick={() => handleSelectedSemester(lecture.semester)}
              >
                {lecture.semester}
              </SemesterButton>
            ))}
          </SemesterButtonsContainer>
        )}
      </SemesterSelectorContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  width: 100%;
  height: 56px;
  border-bottom: 1px solid #f2f2f2;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

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
  z-index: 10;
`

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
`

const SemesterButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  max-height: 200px;
  overflow-y: scroll;
  background-color: #ffffff;
`

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
`
