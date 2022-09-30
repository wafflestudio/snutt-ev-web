import styled from '@emotion/styled';

import { TagWithColor } from '@/lib/dto/tag';

import { TagItem } from './TagItem';

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

const Wrapper = styled.div`
  overflow-y: scroll;
  width: calc(100% - 120px);
`;
