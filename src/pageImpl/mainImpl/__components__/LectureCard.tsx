import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { SvgClockBlack } from '@/components/atoms/Icons/SvgClockBlack';
import SvgPersonBlack from '@/components/atoms/Icons/SvgPersonBlack';
import SvgTagBlack from '@/components/atoms/Icons/SvgTagBlack';
import SvgWrite from '@/components/atoms/Icons/SvgWrite';
import { Detail, Subheading01 } from '@/components/atoms/Typography';
import { LatestLectureDTO } from '@/dto/latestLecture';
import { semesterToString } from '@/utils/semesterToString';

interface Props {
  lecture: LatestLectureDTO;
}

export const LectureCard = ({ lecture }: Props) => {
  const router = useRouter();

  return (
    <Card onClick={() => router.push(`/detail?id=${lecture.id}`)} data-testid="main-recent-lecture-card">
      <CardTop>
        <LectureName>{lecture.title}</LectureName>
        <WriteButton
          data-testid="main-recent-lecture-write-button"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/create?id=${lecture.id}`);
          }}
        >
          <SvgWrite height={20} width={20} />
        </WriteButton>
      </CardTop>

      <CardBottom>
        <Icons>
          <SvgTagBlack height={15} width={15} />
          <SvgPersonBlack height={15} width={15} />
          <SvgClockBlack height={15} width={15} />
        </Icons>
        <Texts>
          <Detail>
            {lecture.department}, {lecture.academic_year}
          </Detail>
          <Detail>{lecture.instructor}</Detail>
          <Detail>{`${lecture.taken_year}년 ${semesterToString(lecture.taken_semester)}학기`}</Detail>
        </Texts>
      </CardBottom>
    </Card>
  );
};

const Card = styled.article`
  min-width: 210px;
  min-height: 108px;
  padding: 11px 15px;

  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 6px;

  margin: 0px 8px 0px 10px;
`;

const CardTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-weight: bold;
`;

const WriteButton = styled.button`
  width: 20px;
  height: 20px;
  z-index: 2;
  background: transparent;
  border: none;
  padding: 0;
`;

const CardBottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 12px;
  height: 61px;
`;

const Icons = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  padding-top: 1px;
  padding-bottom: 1px;
`;

const Texts = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
  justify-content: space-between;
`;

const LectureName = styled(Subheading01)`
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
`;
