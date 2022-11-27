import styled from '@emotion/styled';
import { forwardRef, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'standard';
}

export const Input = forwardRef<HTMLInputElement, Props>(({ variant = 'standard', ...props }, ref) => {
  if (variant === 'standard') return <Standard {...props} ref={ref} />;

  return null;
});

const Standard = styled.input`
  background-color: transparent;
  border-top: none;
  border-left: none;
  border-right: none;

  padding: 4px 0 5px;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.15px;

  color: ${({ theme }) => theme.colors.text.form};
  border-bottom-color: ${({ theme }) => theme.colors.bg.divider};

  &:focus {
    border-bottom-color: ${({ theme }) => theme.colors.border.divider};
  }
`;
