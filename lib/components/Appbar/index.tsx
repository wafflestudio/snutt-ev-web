import styled from "@emotion/styled"
import Image from "next/image"
import { ReactNode } from "react"

interface Props {
  leftImageSrc: string
  leftImageOnClick: () => void
  children: ReactNode
}

export const AppBar = ({ leftImageSrc, leftImageOnClick, children }: Props) => {
  return (
    <Wrapper>
      <AppBarLeft>
        <LeftImage
          src={leftImageSrc}
          alt={"logo"}
          height={30}
          width={30}
          onClick={leftImageOnClick}
        />
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

  border-bottom: solid 1px rgba(151, 151, 151, 0.5);
`

const AppBarLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 13px;
`

const LeftImage = styled(Image)``
