import styled from '@emotion/styled';
import { HTMLProps } from 'react';

interface Props extends Omit<HTMLProps<HTMLButtonElement>, 'size'> {
  as?: never;
  size?: 'big' | 'small';
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'text';
}

export const Button = ({ children, variant = 'primary', size = 'big', ...props }: Props) => {
  if (variant === 'text')
    return (
      <Text $size={size} {...props}>
        {children}
      </Text>
    );

  return (
    <Primary $size={size} {...props}>
      {children}
    </Primary>
  );
};

const SIZE_MAP = {
  big: { padding: '6px 8px', font: 'bold 17px AppleSDGothicNeo' },
  small: { padding: '6px 8px', font: '14px AppleSDGothicNeo' },
};

const Primary = styled.button<{ $size: NonNullable<Props['size']> }>`
  border: none;
  padding: ${({ $size }) => SIZE_MAP[$size].padding};
  font: ${({ $size }) => SIZE_MAP[$size].font};
  color: #ffffff;
  background-color: ${({ theme }) => theme.colors.button.primary.default.bg};
  line-height: 1.7;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.button.primary.disabled.bg};
  }
`;

const Text = styled.button<{ $size: NonNullable<Props['size']> }>`
  border: none;
  padding: ${({ $size }) => SIZE_MAP[$size].padding};
  font: ${({ $size }) => SIZE_MAP[$size].font};
  color: ${({ theme }) => theme.colors.button.secondary.default.text};
  background-color: ${({ theme }) => theme.colors.button.secondary.default.bg};
  line-height: 1.7;

  &:disabled {
    color: ${({ theme }) => theme.colors.button.secondary.disabled.text};
    background-color: ${({ theme }) => theme.colors.button.secondary.disabled.bg};
  }
`;
