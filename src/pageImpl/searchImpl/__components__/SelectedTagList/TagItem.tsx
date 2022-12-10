import { css } from '@emotion/react';
import styled from '@emotion/styled';

import SvgExitWhite from '@/components/atoms/Icons/SvgExitWhite';
import { TagWithColor } from '@/dto/tag';

interface Props {
  tag: TagWithColor;
  onClick: () => void;
}

export const TagItem = ({ tag, onClick }: Props) => {
  return (
    <TagItemBox onClick={onClick} $color={tag.color}>
      <TagText>{tag.name}</TagText>
      <DeleteIcon width={15} height={15} />
    </TagItemBox>
  );
};

const TagText = styled.div`
  font-family: AppleSDGothicNeo;
  font-size: 14px;
  white-space: nowrap;
  font-weight: 400;
  margin-right: 5px;
  color: white;
`;

const TagItemBox = styled.div<{ $color: string | null }>`
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 6px;
  padding-bottom: 6px;
  margin-right: 10px;

  ${({ $color }) =>
    $color &&
    css`
      background-color: ${$color};
    `}
`;

const DeleteIcon = styled(SvgExitWhite)``;
