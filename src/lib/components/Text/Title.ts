import styled from '@emotion/styled';

import { resetMarPad } from '@/lib/styles';

export const Title01 = styled.h1`
  ${resetMarPad}
  font-family: AppleSDGothicNeo;
  font-weight: bold;
  font-size: 17px;
  line-height: 20.5px;
  color: ${({ theme }) => theme.colors.text.default};
`;

export const Title02 = styled.h1`
  ${resetMarPad}
  font-family: AppleSDGothicNeo;
  font-weight: normal;
  font-size: 17px;
  line-height: 20.5px;
  color: ${({ theme }) => theme.colors.text.default};
`;
