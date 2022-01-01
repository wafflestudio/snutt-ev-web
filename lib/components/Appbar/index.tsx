import styled from "@emotion/styled"
<<<<<<< HEAD
import { ReactNode } from "react"

interface Props {
  LeftImage: React.FC
  children: ReactNode
}

export const AppBar = ({ LeftImage, children }: Props) => {
  return (
    <Wrapper>
      <AppBarLeft>
        <LeftImage />
=======
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
>>>>>>> 6cfe3b3 (add Appbar component)
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

<<<<<<< HEAD
  position: sticky;
  top: 0;

  background-color: white;
  border-bottom: solid 1px rgba(179, 179, 179, 0.3);
  z-index: 99;
=======
  border-bottom: solid 1px rgba(151, 151, 151, 0.5);
>>>>>>> 6cfe3b3 (add Appbar component)
`

const AppBarLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 13px;
`
<<<<<<< HEAD
=======

const LeftImage = styled(Image)``
>>>>>>> 6cfe3b3 (add Appbar component)
