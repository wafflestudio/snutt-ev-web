import styled from '@emotion/styled';

import { TagGroupWithColor } from '@/lib/dto/tagGroup';
import { COLORS } from '@/lib/styles/colors';

interface Props {
  tagGroups: TagGroupWithColor[];
  selectedTagGroup?: TagGroupWithColor;
  onTagGroupSelectionChange: (tagGroupId: number) => void;
}

export const TagGroupList = ({ tagGroups, selectedTagGroup, onTagGroupSelectionChange }: Props) => {
  return (
    <Wrapper>
      {tagGroups.map((it) => (
        <TagGroupItem
          isSelected={selectedTagGroup?.name === it.name}
          key={it.name}
          onClick={() => onTagGroupSelectionChange(it.id)}
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
  color: ${({ isSelected, theme }) => (isSelected ? theme.colors.text.default : COLORS.gray2)};
  transition: 0.2s color;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 120px;
`;
