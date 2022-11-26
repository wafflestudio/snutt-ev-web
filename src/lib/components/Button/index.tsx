import styled from '@emotion/styled';
import { HTMLProps } from 'react';

interface Props extends HTMLProps<HTMLButtonElement> {
  as?: never;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({ children, ...props }: Props) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

const Wrapper = styled.button`
  height: 60px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.button.primary.default.bg};
  border: none;
  font-family: AppleSDGothicNeo;
  font-weight: bold;
  font-size: 17px;
  line-height: 20.5px;
  color: #ffffff;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.button.primary.disabled.bg};
  }
`;
