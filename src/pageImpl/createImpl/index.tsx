import styled from '@emotion/styled';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { postLectureEvaluation } from '@/lib/apis/ev';
import { AppBar } from '@/lib/components/Appbar';
import { Button } from '@/lib/components/atoms/Button';
import { Dialog } from '@/lib/components/templates/Dialog';
import { SemesterLectureDTO } from '@/lib/dto/semesterLecture';
import { get } from '@/lib/util/object/get';

import { CreateContentStep } from './CreateContentStep';
import { CreateHeader } from './CreateHeader';
import { CreateScoreStep } from './CreateScoreStep';

const contentMinLength = 30;
const defaultValue = 3;
const defaultScore = { top: defaultValue, left: defaultValue, bottom: defaultValue, right: defaultValue };
type Score = { top: number; left: number; bottom: number; right: number };

export const CreateImpl = () => {
  const router = useRouter();
  const id = Number(router.query['id']);

  const [selectedSemesterId, setSelectedSemesterId] = useState<SemesterLectureDTO['id'] | undefined>(undefined);

  const [step, setStep] = useState(0);

  const [score, setScore] = useState<Score>(defaultScore);
  const [rating, setRating] = useState<number>();
  const [content, setContent] = useState('');

  const [dialogErrorMessage, setDialogErrorMessage] = useState<string | null>(null);

  const isDialogOpen = dialogErrorMessage !== null;
  const isContentValid = content.length >= contentMinLength;

  const closeDialog = () => setDialogErrorMessage(null);

  const updateScore = (value: number, direction: 'top' | 'left' | 'bottom' | 'right') => {
    if (value < 1 || value > 5) return;
    setScore((prev) => ({ ...prev, [direction]: value }));
  };

  const postEvaluation = async () => {
    if (rating === undefined) {
      setDialogErrorMessage('별점을 입력해주세요');
      return;
    }

    if (!selectedSemesterId) {
      setDialogErrorMessage('에러가 발생했습니다');
      return;
    }

    try {
      await postLectureEvaluation({
        params: { id: selectedSemesterId },
        body: {
          content: content,
          grade_satisfaction: score.top,
          teaching_skill: score.left,
          gains: score.bottom,
          life_balance: score.right,
          rating: rating + 1,
        },
      });
      router.replace(`/detail?id=${id}`);
    } catch (err) {
      const isDuplicateError = axios.isAxiosError(err) && get(err, ['response', 'data', 'error', 'code']) === 29001;
      setDialogErrorMessage(isDuplicateError ? '이미 작성한 강의평이 존재합니다' : '에러가 발생했습니다');
    }
  };

  return (
    <Wrapper>
      <AppBar left={<AppBar.BackButton onClick={() => (step === 1 ? setStep(0) : router.back())} />} />
      <Container>
        <CreateHeader
          lectureId={id}
          selectedSemesterId={selectedSemesterId}
          onChangeSelectedSemester={(id) => setSelectedSemesterId(id)}
        />
        {
          [
            <CreateScoreStep key={1} score={score} handleUpdateScore={updateScore} />,
            <CreateContentStep
              key={2}
              rating={rating}
              content={content}
              handleRating={(rating) => setRating(rating)}
              handleContent={(content) => setContent(content)}
              isContentValid={isContentValid}
            />,
          ][step]
        }
        <Complete
          data-testid="create-cta-button"
          onClick={() => {
            if (step < 1) setStep((step) => step + 1);
            else postEvaluation();
          }}
          disabled={step === 1 && !isContentValid}
        >
          {['다음', '완료'][step]}
        </Complete>
      </Container>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <Dialog.Title>{dialogErrorMessage}</Dialog.Title>
        <Dialog.Actions>
          <Button variant="text" size="small" onClick={closeDialog}>
            확인
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 90px;
`;

const Container = styled.div`
  padding: 0px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Complete = styled(Button)`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
`;
