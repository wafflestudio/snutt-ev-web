import styled from "@emotion/styled"
import SvgExitWhite from "@lib/components/Icons/SvgExitWhite"
import { TagDTO } from "@lib/dto/core/tag"

interface Props {
  selectedTags: TagDTO[]
  onDeleteTag: (tag: TagDTO) => void
}

export const ActiveTagList: React.FC<Props> = ({
  selectedTags,
  onDeleteTag,
}) => {
  return selectedTags.length === 0 ? null : (
    <Wrapper>
      {selectedTags.map((it) => (
        <TagItem tag={it} key={it.name} onClick={() => onDeleteTag(it)} />
      ))}
    </Wrapper>
  )
}

const TagItem: React.FC<{
  tag: TagDTO
  onClick: () => void
}> = ({ tag, onClick }) => {
  return (
    <TagItemBox onClick={onClick}>
      <TagText>{tag.name}</TagText>
      <SvgExitWhite width={15} height={15} />
    </TagItemBox>
  )
}

const TagText = styled.div`
  font-family: AppleSDGothicNeo;
  font-size: 14px;
  white-space: nowrap;
  font-weight: 400;
  margin-right: 5px;
  color: white;
`

const TagItemBox = styled.div`
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  background: #857e7e;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 6px;
  padding-bottom: 6px;
  margin-right: 10px;
`

const Wrapper = styled.div`
  overflow: scroll;
  display: flex;
  flex-direction: row;
  padding: 10px;
`
