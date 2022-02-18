import { Fragment, useEffect, useState } from "react"
import styled from "@emotion/styled"
import { usePolygonContainer, useSemestersContainer } from "./__containers__"
import { Header } from "./__components__/Header"
import { EvalPolygon } from "./__components__/EvalPolygon"
import { EvalBasic } from "./__components__/EvalBasic"
import { AppBar } from "@lib/components/Appbar"
import SvgArrowBack from "@lib/components/Icons/SvgArrowBack"
import { useRouter } from "next/router"
import { postLectureEvaluation } from "@lib/api/apis"
import { PostEvaluationQuery } from "@lib/dto/postEvaluation"
import { SemesterLectureDTO } from "@lib/dto/core/semesterLecture"
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material"

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
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogErrorMessage, setDialogErrorMessage] = useState("")

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

  const InvalidationDialog = () => (
    <Dialog
      open={isDialogOpen}
      onClose={() => {
        setIsDialogOpen((status) => !status)
      }}
    >
      <DialogTitle>{dialogErrorMessage}</DialogTitle>
      <DialogActions>
        <Button
          onClick={() => {
            setIsDialogOpen((status) => !status)
          }}
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  )

  const validateInput = () => {
    if (rating === -1) {
      return false
    }

    return true
  }

  const postEvaluation = async () => {
    if (!validateInput()) {
      setIsDialogOpen((status) => !status)
      setDialogErrorMessage("별점을 입력해주세요")

      return
    }

    const query: PostEvaluationQuery = {
      content: content,
      grade_satisfaction: score.top,
      teaching_skill: score.left,
      gains: score.bottom,
      life_balance: score.right,
      rating: rating + 1,
    }

    if (selectedSemester?.id) {
      try {
        await postLectureEvaluation(selectedSemester.id, query)
        router.push(`/detail?id=${id}`)
      } catch (errorCode) {
        if (errorCode === 29001) {
          setIsDialogOpen((status) => !status)
          setDialogErrorMessage("이미 작성한 강의평이 존재합니다")
        } else {
          setIsDialogOpen((status) => !status)
          setDialogErrorMessage("에러가 발생했습니다")
        }
      }
    } else {
      window.alert("Error")
    }
  }

  const stepNext = () => {
    if (step < stepComponents.length - 1) {
      setStep((step) => step + 1)
    } else {
      postEvaluation()
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
    <>
      <InvalidationDialog />
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
    </>
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
