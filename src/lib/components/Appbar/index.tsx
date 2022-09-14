import styled from "@emotion/styled"
import { PropsWithChildren } from "react"

interface Props {
  LeftImage: React.FC
}

export const AppBar = ({ LeftImage, children }: PropsWithChildren<Props>) => {
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
  height: 56px;

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
