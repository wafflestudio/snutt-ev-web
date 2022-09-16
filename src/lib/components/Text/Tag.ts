import styled from '@emotion/styled';

import { resetMarPad } from '@/lib/styles';
import { COLORS } from '@/lib/styles/colors';

export const Tag = styled.span`
  ${resetMarPad}
  font-family: AppleSDGothicNeo;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: ${COLORS.black};
`;
