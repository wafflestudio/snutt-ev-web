import styled from "@emotion/styled"
import { Detail, Subheading01 } from "@lib/components/Text"

import SvgWrite from "@lib/components/Icons/SvgWrite"
import SvgTagBlack from "@lib/components/Icons/SvgTagBlack"
import SvgPersonBlack from "@lib/components/Icons/SvgPersonBlack"
import SvgClockBlack from "@public/icons/clock_black.svg"
import { LatestLectureDTO } from "@lib/dto/core/latestLecture"
import { SemesterIntToString } from "@lib/util"
import { useRouter } from "next/router"

interface Props {
  lecture: LatestLectureDTO
}

export const LectureCard = ({ lecture }: Props) => {
  const router = useRouter()

  return (
    <Card onClick={() => router.push(`/create?=${lecture.id}`)}>
      <CardTop>
        <LectureName>{lecture.title}</LectureName>
        <SvgWrite height={20} width={20} />
      </CardTop>

      <CardBottom>
        <Icons>
          <SvgTagBlack height={15} width={15} />
          <SvgPersonBlack height={15} width={15} />
          <SvgClockBlack />
        </Icons>
        <Texts>
          <Detail>
            {lecture.department}, {lecture.academic_year}
          </Detail>
          <Detail>{lecture.instructor}</Detail>
          <Detail>{`${lecture.taken_year}년 ${SemesterIntToString(
            lecture.taken_semester,
          )}학기`}</Detail>
        </Texts>
      </CardBottom>
    </Card>
  )
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 210px;
  min-height: 108px;
  padding: 11px 15px;

  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 6px;

  margin: 0px 8px 0px 10px;
`
const CardTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  font-weight: bold;
`

const CardBottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 12px;
  height: 61px;
`

const Icons = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  padding-top: 1px;
  padding-bottom: 1px;
`

const ClockIcon = styled.div`
  display: inline-block;
  width: 15px;
  height: 15px;
  object-fit: cover;
`

const Texts = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
  justify-content: space-between;
`

const LectureName = styled(Subheading01)`
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
`
