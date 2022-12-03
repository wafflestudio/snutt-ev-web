import styled from '@emotion/styled';
import { ButtonHTMLAttributes } from 'react';

import SvgExit from './Icons/SvgExit';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const AppBarCloseButton = (props: Props) => {
  const {
    onClick = () => {
      // TODO: implement
      // 닫는 브릿지 호출
      // postMessage({ name: "close" })
      // https://www.notion.so/wafflestudio/d291fe606ec0407ea1292120b070db90
    },
    ...restProps
  } = props;

  return (
    <CloseButton onClick={onClick} data-testid="close-button" {...restProps}>
      <ExitIcon width={30} height={30} />
    </CloseButton>
  );
};

const CloseButton = styled.button`
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  padding: 0;
`;

const ExitIcon = styled(SvgExit)`
  path {
    fill: ${({ theme }) => theme.colors.icon.outlined.stroke};
  }
`;
