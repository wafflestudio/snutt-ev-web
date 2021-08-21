import styled from "@emotion/styled"
import React from "react"
import { TapOptions } from "../__containers__"

interface Props {
  selectedTap: TapOptions
  setSelection: (option: TapOptions) => void
}

export const HeaderTap: React.FC<Props> = ({ selectedTap, setSelection }) => {
  return (
    <Wrapper>
      <TapButton
        isSelected={selectedTap === "recent"}
        onClick={() => setSelection("recent")}
      >
        최근
      </TapButton>
      <TapButton
        isSelected={selectedTap === "my"}
        onClick={() => setSelection("my")}
      >
        나의
      </TapButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`

const TapButton = styled.div<{ isSelected: boolean }>`
  flex-grow: 1;
  color: ${(props) => (props.isSelected ? "red" : "blue")};
`
