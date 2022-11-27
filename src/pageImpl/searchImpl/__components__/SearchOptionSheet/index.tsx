import styled from '@emotion/styled';
import { useState } from 'react';

import SvgExit from '@/lib/components/atoms/Icons/SvgExit';
import { Bottomsheet } from '@/lib/components/templates/Bottomsheet';
import { TagWithColor } from '@/lib/dto/tag';
import { TagGroupWithColor } from '@/lib/dto/tagGroup';

import { TagGroupList } from './TagGroupList';
import { TagList } from './TagList';

interface Props {
  selectedTags: TagWithColor[];
  tagGroups: TagGroupWithColor[];
  onToggleTag: (tag: number) => void;
  isOpened: boolean;
  onClose: () => void;
  onClickSubmit: () => void;
}

export const SearchOptionSheet = ({
  selectedTags,
  tagGroups,
  onToggleTag,
  isOpened,
  onClose: onClose,
  onClickSubmit,
}: Props) => {
  const [selectedTagGroupId, setSelectedTagGroupId] = useState<number>(tagGroups[0]?.id);

  const selectedTagGroup = tagGroups.find((tg) => tg.id === selectedTagGroupId);
  const visibleTags = selectedTagGroup?.tags;

  const onTagGroupChange = (id: number) => setSelectedTagGroupId(id);

  return (
    <Bottomsheet isOpen={isOpened} close={onClose}>
      <Content>
        <HeaderArea>
          <SvgExit width={30} height={30} onClick={onClose} />
        </HeaderArea>
        <TagSelectWrapper>
          <TagGroupList
            tagGroups={tagGroups}
            selectedTagGroup={selectedTagGroup}
            onTagGroupSelectionChange={onTagGroupChange}
          />
          <TagList tags={visibleTags} selectedTags={selectedTags} onToggleTag={onToggleTag} />
        </TagSelectWrapper>
        <SubmitButton onClick={onClickSubmit}>필터 적용</SubmitButton>
      </Content>
    </Bottomsheet>
  );
};

const Content = styled(Bottomsheet.Content)`
  display: flex;
  height: 420px;
  flex-direction: column;
`;

const HeaderArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-top: 20px;
  padding-right: 20px;
`;

const TagSelectWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  max-height: calc(100% - 50px - 64px - 20px); // subtract height of header and height of button
  margin-bottom: 20px;
`;

const SubmitButton = styled.div`
  background: #1bd0c8;
  text-align: center;
  font-family: 'AppleSDGothicNeo';
  color: white;
  font-size: 17px;
  font-weight: 700;
  padding-top: 20px;
  padding-bottom: 20px;
`;
