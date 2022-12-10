import styled from '@emotion/styled';

import { resetMarPad } from '@/styles';

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

export const Detail = styled.p`
  ${resetMarPad}
  font-family: AppleSDGothicNeo;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: ${({ theme }) => theme.colors.text.default};
`;

export const DetailHighlight = styled.p`
  ${resetMarPad}
  font-family: AppleSDGothicNeo;
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  color: ${({ theme }) => theme.colors.text.default};
`;

export const Subheading01 = styled.h2`
  ${resetMarPad}
  font-family: AppleSDGothicNeo;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: ${({ theme }) => theme.colors.text.default};
`;

export const Subheading02 = styled.h2`
  ${resetMarPad}
  font-family: AppleSDGothicNeo;
  font-weight: normal;
  font-size: 14px;
  line-height: 15px;
  color: ${({ theme }) => theme.colors.text.default};
`;
