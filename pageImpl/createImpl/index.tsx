import Image from "next/image"
import styled from "@emotion/styled"
import { useSemsetersContainer } from "./__containers__"
import { Subheading02, Title01 } from "@lib/components/Text"
import { RecentLectureDTO } from "@lib/dto/recentLecture"
import iconDown from "@public/icons/arrow_down.svg"
import { useState } from "react"
import { Header } from "./__components__/Header"

interface Props {
  lecture: RecentLectureDTO
}

const sampleLecture = {
  id: "1",
  name: "소프트웨어 개발의 원리와 실습",
  department: "컴퓨터공학부",
  grade: "3학년",
  semester: "2022-2학기",
  lecturer: "최한결",
  location: "301-314",
}

export const CreateImpl = ({ lecture = sampleLecture }: Props) => {
  const { data: lectureSemesters } = useSemsetersContainer()
  const [isSemesterSelectorOpen, setIsSemesterSelectorOpen] = useState(false)
  const [selectedSemester, setSelectedSemester] = useState("") // ex) '2022 - 1학기'

  const handleSemesterSelector = () => {
    setIsSemesterSelectorOpen((status) => !status)
  }

  const handleSelectedSemester = (semester: string) => {
    setSelectedSemester(semester)
    setIsSemesterSelectorOpen((status) => !status)
  }

  return (
    <Container>
      <Header
        lecture={lecture}
        selectedSemester={selectedSemester}
        isSemesterSelectorOpen={isSemesterSelectorOpen}
        handleSemesterSelector={handleSemesterSelector}
        handleSelectedSemester={handleSelectedSemester}
        lectureSemesters={lectureSemesters}
      ></Header>
    </Container>
  )
}

const Container = styled.div`
  padding: 10px 20px 0px 20px;
  box-sizing: border-box;
`
