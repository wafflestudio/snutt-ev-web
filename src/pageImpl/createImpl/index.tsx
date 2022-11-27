import styled from '@emotion/styled';
import get from 'lodash/get';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';

import { postLectureEvaluation } from '@/lib/apis/ev';
import { PostEvaluationQuery } from '@/lib/apis/ev/types';
import { AppBar } from '@/lib/components/Appbar';
import { Button } from '@/lib/components/atoms/Button';
import { Dialog } from '@/lib/components/templates/Dialog';
import { SemesterLectureDTO } from '@/lib/dto/semesterLecture';

import { EvalBasic, EvalPolygon, Header } from './__components__';
import { useLectureSemesters, usePolygon } from './__containers__';

export const CreateImpl = () => {
  const router = useRouter();
  const id = Number(router.query['id']);

  const { data: lectureSemesters } = useLectureSemesters(id);
  const [isSemesterSelectorOpen, setIsSemesterSelectorOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<SemesterLectureDTO | undefined>(undefined);

  useEffect(() => {
    const latestLectureSemester = lectureSemesters?.semester_lectures[0];
    if (latestLectureSemester) {
      setSelectedSemester(latestLectureSemester);
    }
  }, [lectureSemesters]);

  const [rating, setRating] = useState(-1);
  const [content, setContent] = useState('');

  const [step, setStep] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogErrorMessage, setDialogErrorMessage] = useState('');

  const { score, updateScore } = usePolygon();

  const [contentsUnsatisfied, setContentsUnsatisfied] = useState(true);

  const handleRating = (rating: number) => {
    setRating(rating);
  };

  const handleContent = (content: string) => {
    setContent(content);

    const contentMinLength = 30;
    setContentsUnsatisfied(content.length < contentMinLength);
  };

  const handleSemesterSelector = () => {
    setIsSemesterSelectorOpen((status) => !status);
  };

  const handleSelectedSemester = (semesterLecture: SemesterLectureDTO) => {
    setSelectedSemester(semesterLecture);
    setIsSemesterSelectorOpen((status) => !status);
  };

  const validateRatings = () => {
    if (rating === -1) {
      return false;
    }

    return true;
  };

  const postEvaluation = async () => {
    if (!validateRatings()) {
      setIsDialogOpen((status) => !status);
      setDialogErrorMessage('별점을 입력해주세요');

      return;
    }

    const query: PostEvaluationQuery = {
      content: content,
      grade_satisfaction: score.top,
      teaching_skill: score.left,
      gains: score.bottom,
      life_balance: score.right,
      rating: rating + 1,
    };

    if (selectedSemester?.id) {
      try {
        await postLectureEvaluation({
          params: { id: selectedSemester.id },
          body: query,
        });
        router.replace(`/detail?id=${id}`);
      } catch (err) {
        const errorCode = get(err, ['response', 'data', 'error', 'code']);

        if (errorCode === 29001) {
          setIsDialogOpen((status) => !status);
          setDialogErrorMessage('이미 작성한 강의평이 존재합니다');
        } else {
          setIsDialogOpen((status) => !status);
          setDialogErrorMessage('에러가 발생했습니다');
        }
      }
    } else {
      setIsDialogOpen((status) => !status);
      setDialogErrorMessage('에러가 발생했습니다');
    }
  };

  const stepNext = () => {
    if (step < stepComponents.length - 1) {
      setStep((step) => step + 1);
    } else {
      postEvaluation();
    }
  };

  const stepPrev = () => {
    if (step > 0) {
      setStep((step) => step - 1);
    }
  };

  const stepComponents = [
    <EvalPolygon key={1} score={score} handleUpdateScore={updateScore} />,
    <EvalBasic
      key={2}
      handleRating={handleRating}
      rating={rating}
      handleContent={handleContent}
      content={content}
      contentsUnsatisfied={contentsUnsatisfied}
    />,
  ];

  const complete = step === stepComponents.length - 1 ? '완료' : '다음';

  return (
    <>
      <Wrapper>
        <AppBar left={<AppBar.BackButton onClick={() => (step === 1 ? stepPrev() : router.back())} />} />
        <Container>
          <Header
            lectureName={lectureSemesters?.title}
            lectureInstructor={lectureSemesters?.instructor}
            lectureCredit={lectureSemesters?.credit}
            lectureClassification={lectureSemesters?.classification}
            selectedSemester={selectedSemester}
            isSemesterSelectorOpen={isSemesterSelectorOpen}
            handleSemesterSelector={handleSemesterSelector}
            handleSelectedSemester={handleSelectedSemester}
            lectureSemesters={lectureSemesters?.semester_lectures}
          />
          {stepComponents.map((component, index) => {
            if (step === index) {
              return <Fragment key={index}>{component}</Fragment>;
            }
            return null;
          })}
          <Complete onClick={stepNext} disabled={step === stepComponents.length - 1 && contentsUnsatisfied}>
            {complete}
          </Complete>
        </Container>
      </Wrapper>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen((status) => !status)}>
        <Dialog.Title>{dialogErrorMessage}</Dialog.Title>
        <Dialog.Actions>
          <Button variant="text" size="small" onClick={() => setIsDialogOpen((status) => !status)}>
            확인
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

const Wrapper = styled.div`
  margin-bottom: 90px;
`;

const Container = styled.div`
  padding: 0px 20px 0px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /* height: 100vh; */
`;

const Complete = styled(Button)`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
`;
