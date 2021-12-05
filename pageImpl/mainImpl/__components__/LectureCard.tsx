import styled from "@emotion/styled"
import { Detail, Subheading01 } from "@lib/components/Text"
import { RecentLectureDTO } from "@lib/dto/recentLecture"
import Image from "next/image"

import person_black from "@public/icons/person_black.svg"
import tag_black from "@public/icons/tag_black.svg"
import map_black from "@public/icons/map_black.svg"
import write_icon from "@public/icons/write.svg"

interface Props {
  lecture: RecentLectureDTO
}

export const LectureCard = ({ lecture }: Props) => {
  return (
    <Card>
      <CardTop>
        <LectureName>{lecture.name}</LectureName>
        <Image
          src={write_icon}
          alt={"write_icon"}
          layout={"fixed"}
          height={20}
          width={20}
        />
      </CardTop>

      <CardBottom>
        <Icons>
          <Image src={tag_black} alt={"tag_icon"} height={15} width={15} />
          <Image
            src={person_black}
            alt={"person_icon"}
            height={15}
            width={15}
          />
          <Image src={map_black} alt={"map_icon"} height={15} width={15} />
        </Icons>
        <Texts>
          <Detail>
            {lecture.department}, {lecture.grade}
          </Detail>
          <Detail>{lecture.lecturer}</Detail>
          <Detail>{lecture.location}</Detail>
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
