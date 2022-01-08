import styled from "@emotion/styled"
import { useSemsetersContainer } from "./__containers__"
import { RecentLectureDTO } from "@lib/dto/recentLecture"
import { Fragment, useState } from "react"
import { Header } from "./__components__/Header"
import { EvalPolygon } from "./__components__/EvalPolygon"
import { EvalBasic } from "./__components__/EvalBasic"

interface Props {
  lecture: RecentLectureDTO
}

export const CreateImpl = ({ lecture }: Props) => {
  const { data: lectureSemesters } = useSemsetersContainer()
  const [isSemesterSelectorOpen, setIsSemesterSelectorOpen] = useState(false)
  const [selectedSemester, setSelectedSemester] = useState("") // ex) '2022 - 1학기'
  const [rating, setRating] = useState(0)
  const [content, setContent] = useState("")

  const [step, setStep] = useState(0)

  const handleRating = (rating: number) => {
    setRating(rating)
  }

  const handleContent = (content: string) => {
    setContent(content)
  }

  const handleSemesterSelector = () => {
    setIsSemesterSelectorOpen((status) => !status)
  }

  const handleSelectedSemester = (semester: string) => {
    setSelectedSemester(semester)
    setIsSemesterSelectorOpen((status) => !status)
  }

  const stepNext = () => {
    if (step < stepComponents.length - 1) {
      setStep((step) => step + 1)
    }
  }

  const stepPrev = () => {
    if (step > 0) {
      setStep((step) => step - 1)
    }
  }

  const stepComponents = [
    <EvalPolygon />,
    <EvalBasic
      handleRating={handleRating}
      rating={rating}
      handleContent={handleContent}
      content={content}
      stepPrev={stepPrev}
    />,
  ]

  const complete = step === stepComponents.length - 1 ? "완료" : "다음"

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
      {stepComponents.map((component, index) => {
        if (step === index) {
          return <Fragment key={index}>{component}</Fragment>
        }
        return null
      })}
      <Complete onClick={stepNext}>{complete}</Complete>
    </Container>
  )
}

const Container = styled.div`
  padding: 10px 20px 0px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /* height: 100vh; */
`

const Complete = styled.button`
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 60px;
  background-color: #1bd0c8;
  font-family: AppleSDGothicNeo;
  font-weight: bold;
  font-size: 17px;
  line-height: 20.5px;
  color: #ffffff;
  border: none;
`
