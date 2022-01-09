import { TagDTO } from "@lib/dto/core/tag"
import styled from "@emotion/styled"
import SvgChecked from "@lib/components/Icons/SvgChecked"
import SvgUnchecked from "@lib/components/Icons/SvgUnchecked"

interface Props {
  tags: TagDTO[]
  selectedTags: TagDTO[]
  onToggleTag: (tag: TagDTO) => void
}

export const TagList: React.FC<Props> = ({
  tags,
  selectedTags,
  onToggleTag,
}) => {
  return (
    <div>
      {tags.map((it) => (
        <TagItem
          isSelected={selectedTags.some((s) => s.name === it.name)}
          key={it.name}
          onClick={() => onToggleTag(it)}
          text={it.name}
        />
      ))}
    </div>
  )
}

const TagItem: React.FC<{
  isSelected: boolean
  text: string
  onClick: () => void
}> = ({ isSelected, text, onClick }) => {
  return (
    <TagItemBox onClick={onClick}>
      {isSelected ? (
        <SvgChecked width={15} height={15} />
      ) : (
        <SvgUnchecked width={15} height={15} />
      )}
      <TagItemText>{text}</TagItemText>
    </TagItemBox>
  )
}

const TagItemBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const TagItemText = styled.div`
  font-family: "AppleSDGothicNeo";
  font-size: 14px;
  font-weight: 400;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: "#000000";
`
