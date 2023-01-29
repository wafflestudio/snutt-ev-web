import styled from '@emotion/styled';
import { forwardRef, HTMLProps } from 'react';

import { SvgLike } from '@/components/atoms/Icons/SvgLike';
import { COLORS } from '@/styles/colors';

interface Props extends HTMLProps<HTMLButtonElement> {
  likeCount: number;
  likebyMe: boolean;
  type?: 'submit' | 'button' | 'reset'; // HTMLProps 랑 emotion 이랑 타입 안맞아서 emotion 에 맞춰 narrowing
  as?: never; // 마찬가지로 타입 안맞아서 narrow 하려다가 무조건 button 이어야 하므로 아예 사용 막아버림
}

export const LikeButton = forwardRef<HTMLButtonElement, Props>(function LB(
  { likeCount, likebyMe, type = 'button', ...props },
  ref,
) {
  return (
    <Wrapper type={type} ref={ref} $likeByMe={likebyMe} aria-checked={likebyMe} data-testid="like-button" {...props}>
      <LikeIcon $likeByMe={likebyMe} />
      <span data-testid="like-button-count">{likeCount}</span>
    </Wrapper>
  );
});

const Wrapper = styled('button', { shouldForwardProp: (p) => p !== '$likeByMe' })<{ $likeByMe: boolean }>`
  width: 55px;
  height: 28px;
  display: block;
  padding: 0;
  margin: 0;
  border-radius: 14px;
  border: ${({ $likeByMe }) => ($likeByMe ? 'none' : `1px solid ${COLORS.lightGray}`)};
  background-color: ${({ $likeByMe, theme }) =>
    $likeByMe ? theme.colors.button.primary.default.bg : theme.colors.bg.default};

  color: ${({ $likeByMe, theme }) => ($likeByMe ? COLORS.white : theme.colors.text.default)};
  font-size: 14px;
  line-height: 20px;
  font-family: AppleSDGothicNeo;
`;

const LikeIcon = styled(SvgLike, { shouldForwardProp: (p) => p !== '$likeByMe' })<{ $likeByMe: boolean }>`
  margin-right: 8px;

  path {
    fill: ${({ $likeByMe }) => ($likeByMe ? COLORS.white : COLORS.mint)} !important;
  }
`;
