import styled from "@emotion/styled"
import { ReactNode } from "react"

interface Props {
  LeftImage: React.FC
}

export const AppBar: React.FC<Props> = ({ LeftImage, children }) => {
  return (
    <Wrapper>
      <AppBarLeft>
        <LeftImage />
      </AppBarLeft>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  order: 1;
  height: 45px;

  position: sticky;
  top: 0;

  background-color: white;
  border-bottom: solid 1px rgba(179, 179, 179, 0.3);
  z-index: 99;
`

const AppBarLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 13px;
`
