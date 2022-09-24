import styled from '@emotion/styled';

import { TagGroupWithColor } from '@/lib/dto/core/tagGroup';

interface Props {
  tagGroups: TagGroupWithColor[];
  selectedTagGroup?: TagGroupWithColor;
  onTagGroupSelectionChange: (tagGroup: TagGroupWithColor) => void;
}

export const TagGroupList = ({
  tagGroups,
  selectedTagGroup,
  onTagGroupSelectionChange,
}: Props) => {
  return (
    <Wrapper>
      {tagGroups.map((it) => (
        <TagGroupItem
          isSelected={selectedTagGroup?.name === it.name}
          key={it.name}
          onClick={() => onTagGroupSelectionChange(it)}
        >
          {it.name}
        </TagGroupItem>
      ))}
    </Wrapper>
  );
};

const TagGroupItem = styled.div<{ isSelected: boolean }>`
  margin: 10px 0 10px 20px;

  font-family: 'AppleSDGothicNeo';
  font-size: 17px;
  font-weight: 700;
  color: ${(props) => (props.isSelected ? '#000000' : '#b3b3b3')};
  transition: 0.2s color;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 120px;
`;
