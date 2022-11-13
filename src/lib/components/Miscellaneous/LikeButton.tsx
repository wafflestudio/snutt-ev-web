import styled from '@emotion/styled';
import { forwardRef, HTMLProps } from 'react';

import { SvgLike } from '@/lib/components/Icons/SvgLike';

interface Props extends HTMLProps<HTMLButtonElement> {
  likeCount: number;
  type?: 'submit' | 'button' | 'reset'; // HTMLProps 랑 emotion 이랑 타입 안맞아서 emotion 에 맞춰 narrowing
  as?: never; // 마찬가지로 타입 안맞아서 narrow 하려다가 무조건 button 이어야 하므로 아예 사용 막아버림
}

export const LikeButton = forwardRef<HTMLButtonElement, Props>(function LB(
  { likeCount, type = 'button', ...props },
  ref,
) {
  return (
    <Wrapper type={type} ref={ref} {...props}>
      <LikeIcon />
      {likeCount}
    </Wrapper>
  );
});

const Wrapper = styled.button`
  width: 55px;
  height: 28px;
  display: block;
  padding: 0;
  margin: 0;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  background-color: ${({ theme }) => theme.colors.bg};

  color: ${({ theme }) => theme.colors.text.default};
  font-size: 14px;
  line-height: 20px;
  font-family: AppleSDGothicNeo;
`;

const LikeIcon = styled(SvgLike)`
  margin-right: 8px;
`;
