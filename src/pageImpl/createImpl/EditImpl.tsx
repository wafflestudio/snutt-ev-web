import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { fetchEvaluation } from '@/apis/ev';
import { Button } from '@/components/atoms/Button';
import SvgWarning from '@/components/atoms/Icons/SvgWarning';
import { AppBar } from '@/components/molecules/AppBar';
import { SemesterLectureDTO } from '@/dto/semesterLecture';
import { COLORS } from '@/styles/colors';

import { CreateContentStep } from './CreateContentStep';
import { CreateHeader } from './CreateHeader';
import { CreateScoreStep } from './CreateScoreStep';

const contentMinLength = 30;
const defaultValue = 3;
const defaultScore = { top: defaultValue, left: defaultValue, bottom: defaultValue, right: defaultValue };
type Score = { top: number; left: number; bottom: number; right: number };

const EditImpl = () => {
  const router = useRouter();
  const evaluationId = Number(router.query['evaluation_id']);

  const { data: evaluation } = useEvaluation(evaluationId);

  const [selectedSemesterId, setSelectedSemesterId] = useState<SemesterLectureDTO['id'] | undefined>(undefined);

  const [step, setStep] = useState(0);

  const [score, setScore] = useState<Score>(defaultScore);
  const [rating, setRating] = useState<number>();
  const [content, setContent] = useState('');

  const isContentValid = content.trim().length >= contentMinLength;

  useEffect(() => {
    if (!evaluation) return;

    const score = {
      top: evaluation.grade_satisfaction || defaultValue,
      left: evaluation.teaching_skill || defaultValue,
      bottom: evaluation.gains || defaultValue,
      right: evaluation.life_balance || defaultValue,
    };

    setScore(score);
    setRating(evaluation.rating - 1);
    setContent(evaluation.content);
  }, [evaluation]);

  const updateScore = (value: number, direction: 'top' | 'left' | 'bottom' | 'right') => {
    if (value < 1 || value > 5) return;
    setScore((prev) => ({ ...prev, [direction]: value }));
  };

  return (
    <Wrapper>
      <AppBar left={<AppBar.BackButton onClick={() => (step === 1 ? setStep(0) : router.back())} />} />
      <Container>
        {evaluation && (
          <CreateHeader
            lectureId={evaluation.lecture_id}
            selectedSemesterId={selectedSemesterId}
            onChangeSelectedSemester={(id) => setSelectedSemesterId(id)}
          />
        )}
        <Warning>
          <SvgWarning width={18} height={18} color={COLORS.red} />
          <span>강의평 수정시 공감 내용은 초기화됩니다.</span>
        </Warning>
        {/* {isEditable && '강의평 초기화 됨'} */}
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
            // else postEvaluation();
          }}
          disabled={step === 1 && !isContentValid}
        >
          {['다음', '완료'][step]}
        </Complete>
        <SvgWarning />
      </Container>
      {/* <Diallg open={isDialogOpen} onClose={closeDialog}>
        <Dialog.Title>{dialogErrorMessage}</Dialog.Title>
        <Dialog.Actions>
          <Button variant="text" size="small" onClick={closeDialog}>
            확인
          </Button>
        </Dialog.Actions>
      </Diallg> */}
    </Wrapper>
  );
};

const useEvaluation = (id: number) =>
  useQuery(['evaluation', id], () => fetchEvaluation({ params: { id } }), {
    enabled: !isNaN(id),
  });

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

const Warning = styled.div`
  width: 100%;
  height: 19px;
  display: flex;
  align-items: center;
  background: rgba(229, 68, 89, 0.1);
  border-radius: 4px;

  line-height: 19px;
  text-align: center;
  color: ${COLORS.red};

  span {
    position: relative;
    top: -1.5px;
    font-family: AppleSDGothicNeo;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
  }
`;

export default EditImpl;
