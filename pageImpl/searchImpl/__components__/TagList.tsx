import { TagDTO } from "@lib/dto/core/tag"
import styled from "@emotion/styled"
import checked from "@public/icons/checked.svg"
import unchecked from "@public/icons/unchecked.svg"
import Image from "next/image"

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
      <Image
        src={isSelected ? checked : unchecked}
        alt="checked"
        width={15}
        height={15}
      />
      <TagItemText>{text}</TagItemText>
    </TagItemBox>
  )
}

const TagItemBox = styled.div`
  display: flex;
  flex-direction: row;
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
