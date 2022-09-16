import styled from '@emotion/styled';

import { resetMarPad } from '@/lib/styles';
import { COLORS } from '@/lib/styles/colors';

export const Detail = styled.p`
  ${resetMarPad}
  font-family: AppleSDGothicNeo;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: ${COLORS.black};
`;

export const DetailHighlight = styled.p`
  ${resetMarPad}
  font-family: AppleSDGothicNeo;
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  color: ${COLORS.black};
`;
