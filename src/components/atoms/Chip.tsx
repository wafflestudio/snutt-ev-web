import styled from '@emotion/styled';
import { ButtonHTMLAttributes, forwardRef } from 'react';

import { COLORS } from '@/styles/colors';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export const Chip = forwardRef<HTMLButtonElement, Props>(({ selected = false, children, ...props }, ref) => {
  return (
    <ChipButton ref={ref} $selected={selected} {...props}>
      {children}
    </ChipButton>
  );
});

const ChipButton = styled.button<{ $selected: boolean }>`
  border: 1px solid #777777;
  border-radius: 15px;
  height: 30px;
  padding: 0 11px;
  font-size: 14px;
  font-family: AppleSDGothicNeo;

  color: ${({ theme, $selected }) => (!$selected ? theme.colors.text.toggle : COLORS.white)};
  background-color: ${({ theme, $selected }) => (!$selected ? theme.colors.bg.default : COLORS.darkGray)};
`;
