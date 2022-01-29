import styled from "@emotion/styled"
import { usePolygonContainer, useSemestersContainer } from "./__containers__"
import { Fragment, useEffect, useState } from "react"
import { Header } from "./__components__/Header"
import { EvalPolygon } from "./__components__/EvalPolygon"
import { EvalBasic } from "./__components__/EvalBasic"
import { AppBar } from "@lib/components/Appbar"
import SvgArrowBack from "@lib/components/Icons/SvgArrowBack"
import { useRouter } from "next/router"
import { postLectureEvaluation } from "@lib/api/apis"
import { PostEvaluationQuery } from "@lib/dto/postEvaluation"
import { SemesterLectureDTO } from "@lib/dto/core/semesterLecture"

export const CreateImpl = () => {
  const router = useRouter()
  const id = Number(router.query["id"])

  const { data: lectureSemesters } = useSemestersContainer(id)
  const [isSemesterSelectorOpen, setIsSemesterSelectorOpen] = useState(false)
  const [selectedSemester, setSelectedSemester] = useState<
    SemesterLectureDTO | undefined
  >(undefined)

  useEffect(() => {
    const latestLectureSemester = lectureSemesters?.semester_lectures[0]
    if (latestLectureSemester) {
      setSelectedSemester(latestLectureSemester)
    }
  }, [lectureSemesters])

  const [rating, setRating] = useState(-1)
  const [content, setContent] = useState("")

  const [step, setStep] = useState(0)

  const { defaultValue, score, updateScore } = usePolygonContainer()

  const handleRating = (rating: number) => {
    setRating(rating)
  }

  const handleContent = (content: string) => {
    setContent(content)
  }

  const handleSemesterSelector = () => {
    setIsSemesterSelectorOpen((status) => !status)
  }

  const handleSelectedSemester = (semesterLecture: SemesterLectureDTO) => {
    setSelectedSemester(semesterLecture)
    setIsSemesterSelectorOpen((status) => !status)
  }

  const postEvaluation = async () => {
    const query: PostEvaluationQuery = {
      content: content,
      grade_satisfaction: score.top,
      teaching_skill: score.left,
      gains: score.bottom,
      life_balance: score.right,
      rating: rating + 1,
    }

    selectedSemester
      ? await postLectureEvaluation(selectedSemester?.id, query)
      : console.log("???")
  }

  const stepNext = () => {
    if (step < stepComponents.length - 1) {
      setStep((step) => step + 1)
    } else {
      postEvaluation()
        .then(() => router.push(`/detail/${id}`))
        .catch((e) => console.log(e))
    }
  }

  const stepPrev = () => {
    if (step > 0) {
      setStep((step) => step - 1)
    }
  }

  const stepComponents = [
    <EvalPolygon
      key={1}
      defaultValue={defaultValue}
      score={score}
      handleUpdateScore={updateScore}
    />,
    <EvalBasic
      key={2}
      handleRating={handleRating}
      rating={rating}
      handleContent={handleContent}
      content={content}
      stepPrev={stepPrev}
    />,
  ]

  const complete = step === stepComponents.length - 1 ? "완료" : "다음"

  return (
    <Wrapper>
      <AppBar
        LeftImage={() => (
          <SvgArrowBack
            height={30}
            width={30}
            onClick={() => {
              step === 1 ? stepPrev() : router.back()
            }}
          />
        )}
      />
      <Container>
        <Header
          lectureName={lectureSemesters?.title}
          lectureInstructor={lectureSemesters?.instructor}
          selectedSemester={selectedSemester}
          isSemesterSelectorOpen={isSemesterSelectorOpen}
          handleSemesterSelector={handleSemesterSelector}
          handleSelectedSemester={handleSelectedSemester}
          lectureSemesters={lectureSemesters?.semester_lectures}
        />
        {stepComponents.map((component, index) => {
          if (step === index) {
            return <Fragment key={index}>{component}</Fragment>
          }
          return null
        })}
        <Complete onClick={stepNext}>{complete}</Complete>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div``

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
