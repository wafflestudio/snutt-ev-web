import styled from '@emotion/styled';

import { TagWithColor } from '@/lib/dto/tag';

import { TagItem } from './TagItem';

interface Props {
  selectedTags: TagWithColor[] | undefined;
  onDeleteTag: (tag: number) => void;
}

export const ActiveTagList = ({ selectedTags = [], onDeleteTag }: Props) => {
  if (selectedTags.length === 0) return null;

  return (
    <Wrapper>
      {selectedTags.map((it) => (
        <TagItem tag={it} key={it.name} onClick={() => onDeleteTag(it.id)} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: scroll;
  display: flex;
  flex-direction: row;
  padding: 10px;
`;
