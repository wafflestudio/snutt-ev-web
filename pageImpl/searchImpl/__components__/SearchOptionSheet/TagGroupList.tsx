import styled from "@emotion/styled"
import { TagGroupDTO } from "@lib/dto/core/tagGroup"

interface Props {
  tagGroups: TagGroupDTO[]
  selectedTagGroup?: TagGroupDTO
  onTagGroupSelectionChange: (tagGroup: TagGroupDTO) => void
}

export const TagGroupList: React.FC<Props> = ({
  tagGroups,
  selectedTagGroup,
  onTagGroupSelectionChange,
}) => {
  return (
    <Wrapper>
      {tagGroups.map((it) => (
        <TagGroupItem
          isSelected={selectedTagGroup?.name === it.name}
          key={it.name}
          onClick={() => {
            onTagGroupSelectionChange(it)
          }}
        >
          {it.name}
        </TagGroupItem>
      ))}
    </Wrapper>
  )
}

const TagGroupItem = styled.div<{ isSelected: boolean }>`
  font-family: "AppleSDGothicNeo";
  font-size: 17px;
  font-weight: 700;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: ${(props) => (props.isSelected ? "#000000" : "#b3b3b3")};
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 120px;
`
