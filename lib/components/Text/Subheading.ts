import styled from "@emotion/styled"

import { resetMarPad } from "@/lib/styles"
import { COLORS } from "@/lib/styles/colors"

export const Subheading01 = styled.h2`
  ${resetMarPad}
  font-family: AppleSDGothicNeo;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: ${COLORS.black};
`

export const Subheading02 = styled.h2`
  ${resetMarPad}
  font-family: AppleSDGothicNeo;
  font-weight: normal;
  font-size: 14px;
  line-height: 15px;
  color: ${COLORS.black};
`
