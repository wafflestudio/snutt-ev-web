import styled from "@emotion/styled"
import { TagGroupList } from "./TagGroupList"
import { useMemo, useState } from "react"
import { TagList } from "./TagList"
import { TagWithColor } from "@lib/dto/core/tag"
import { TagGroupWithColor } from "@lib/dto/core/tagGroup"
import Sheet from "react-modal-sheet"
import SvgExit from "@lib/components/Icons/SvgExit"

interface Props {
  selectedTags: TagWithColor[]
  tagGroups: TagGroupWithColor[]
  onToggleTag: (tag: TagWithColor) => void
  isOpened: boolean
  onClose: () => void
  onClickSubmit: () => void
}

export const SearchOptionSheet: React.FC<Props> = ({
  selectedTags,
  tagGroups,
  onToggleTag,
  isOpened,
  onClose: onClose,
  onClickSubmit,
}) => {
  const [selectedTagGroup, setSelectedTagGroup] = useState<TagGroupWithColor>(
    tagGroups[0],
  )

  const visibleTags = useMemo(() => {
    return selectedTagGroup.tags
  }, [selectedTagGroup, tagGroups])

  return (
    <Sheet isOpen={isOpened} onClose={onClose} snapPoints={[420]}>
      <Sheet.Container>
        <Sheet.Content>
          <Wrapper>
            <HeaderArea>
              <SvgExit width={30} height={30} onClick={onClose} />
            </HeaderArea>
            <TagSelectWrapper>
              <TagGroupList
                tagGroups={tagGroups}
                selectedTagGroup={selectedTagGroup}
                onTagGroupSelectionChange={setSelectedTagGroup}
              />
              <TagList
                tags={visibleTags}
                selectedTags={selectedTags}
                onToggleTag={onToggleTag}
              />
            </TagSelectWrapper>
            <SubmitButton onClick={onClickSubmit}>필터 적용</SubmitButton>
          </Wrapper>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} />
    </Sheet>
  )
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`

const HeaderArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-top: 20px;
  padding-right: 20px;
`

const TagSelectWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  height: calc(
    100% - 50px - 64px
  ); // subtract height of header and height of button
`

const SubmitButton = styled.div`
  background: #1bd0c8;
  text-align: center;
  font-family: "AppleSDGothicNeo";
  color: white;
  font-size: 17px;
  font-weight: 700;
  padding-top: 20px;
  padding-bottom: 20px;
`
