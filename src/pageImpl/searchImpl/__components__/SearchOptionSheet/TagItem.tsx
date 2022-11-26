import styled from '@emotion/styled';

import SvgChecked from '@/lib/components/Icons/SvgChecked';
import SvgUnchecked from '@/lib/components/Icons/SvgUnchecked';

interface Props {
  isSelected: boolean;
  text: string;
  onClick: () => void;
}

export const TagItem = ({ isSelected, text, onClick }: Props) => {
  const Icon = isSelected ? SvgChecked : SvgUnchecked;

  return (
    <TagItemBox onClick={onClick}>
      <Icon width={15} height={15} />
      <TagItemText>{text}</TagItemText>
    </TagItemBox>
  );
};

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
  color: ${({ theme }) => theme.colors.text.default};
`;
