import styled from "@emotion/styled"
import Image from "next/image"

import person_black from "@public/icons/person_black.svg"
import tag_black from "@public/icons/tag_black.svg"
import write_icon from "@public/icons/write.svg"
import { Subheading01 } from "@lib/components/Text"
import { RecentLectureDTO } from "@lib/dto/recentLecture"

interface Props {
  content: RecentLectureDTO
}

export const RecentLectureItem: React.FC<Props> = ({ content }) => {
  return (
    <Wrapper>
      <ItemTop>
        <SubjectText>{content.name}</SubjectText>
      </ItemTop>

      <ItemBottom>
        <ItemBottomLeft>
          <Icons>
            <Image src={tag_black} alt={"tag"} height={15} width={15} />
            <Image src={person_black} alt={"person"} height={15} width={15} />
          </Icons>
          <Texts>
            <InfoText>
              {content.department}, {content.grade}
            </InfoText>
            <LecturerText>{content.lecturer}</LecturerText>
          </Texts>
        </ItemBottomLeft>
        <ItemBottomRight>
          <Image
            src={write_icon}
            alt={"pen"}
            height={30}
            width={30}
            onClick={() => {}} //TODO: go to create review page
          />
        </ItemBottomRight>
      </ItemBottom>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-top: 10px;
  padding-bottom: 12px;

  border-bottom: solid 1px rgba(196, 196, 196, 0.3);
`

const ItemTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  font-weight: bold;
`

const ItemBottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 12px;
`

const ItemBottomLeft = styled.div`
  display: flex;
  height: 39px;
`

const ItemBottomRight = styled.div``

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

const SubjectText = styled(Subheading01)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const InfoText = styled.div`
  font-family: AppleSDGothicNeo;
  font-weight: normal;

  font-size: 12px;
  line-height: 16.5px;
`

const LecturerText = styled.div`
  font-family: AppleSDGothicNeo;
  font-weight: normal;

  font-size: 12px;
  line-height: 16.5px;
`
