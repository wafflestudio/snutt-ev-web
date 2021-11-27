import styled from "@emotion/styled"
import { Detail, Subheading01 } from "@lib/components/Text"
import { RecentLectureDTO } from "@lib/dto/recentLecture"

interface Props {
  lecture: RecentLectureDTO
}

export const LectureCard = ({ lecture }: Props) => {
  return (
    <Card>
      <Subheading01>{lecture.name}</Subheading01>
      <Detail>{lecture.department}</Detail>
      <Detail>{lecture.lecturer}</Detail>
      <Detail>{lecture.location}</Detail>
    </Card>
  )
}

const Card = styled.div`
  display: inline-block;
  flex-direction: column;
  align-items: flex-start;
  padding: 11px 15px;

  width: 210px;
  height: 108px;

  border: 1px solid #c4c4c4;
  box-sizing: content-box;
  border-radius: 6px;

  margin: 0px 8px 0px 10px;
`
