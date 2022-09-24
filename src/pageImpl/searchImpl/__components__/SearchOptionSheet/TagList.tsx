import styled from '@emotion/styled';

import SvgChecked from '@/lib/components/Icons/SvgChecked';
import SvgUnchecked from '@/lib/components/Icons/SvgUnchecked';
import { TagWithColor } from '@/lib/dto/core/tag';

interface Props {
  tags?: TagWithColor[];
  selectedTags: TagWithColor[];
  onToggleTag: (tag: number) => void;
}

export const TagList = ({ tags, selectedTags, onToggleTag }: Props) => {
  return (
    <Wrapper>
      {tags?.map((it) => (
        <TagItem
          isSelected={selectedTags.some((s) => s.name === it.name)}
          key={it.name}
          onClick={() => onToggleTag(it.id)}
          text={it.name}
        />
      ))}
    </Wrapper>
  );
};

const TagItem: React.FC<{
  isSelected: boolean;
  text: string;
  onClick: () => void;
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
  );
};

const Wrapper = styled.div`
  overflow-y: scroll;
  width: calc(100% - 120px);
`;

const TagItemBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TagItemText = styled.div`
  font-family: 'AppleSDGothicNeo';
  font-size: 14px;
  font-weight: 400;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: '#000000';
`;
