import { useState, useRef, useEffect } from "react"
import { TootTipContent } from "@/pageImpl/createImpl/__components__/ToolTipContent"
import SvgTooltip from "@/lib/components/Icons/SvgTooltip"
import styled from "@emotion/styled"

export const RatingTooltip = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const buttonRef = useRef(null)

  const onClickOutsideButton = (e: Event) => {
    e.preventDefault()
    if (
      buttonRef.current &&
      (buttonRef.current as any).contains(e.target) === false
    ) {
      setTooltipOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", onClickOutsideButton)

    return () => {
      document.removeEventListener("click", onClickOutsideButton)
    }
  }, [])

  return (
    <Wrapper>
      <TooltipButton
        onClick={() => setTooltipOpen(!tooltipOpen)}
        ref={buttonRef}
      >
        <SvgTooltip width={30} height={30} />
      </TooltipButton>
      {tooltipOpen && <TootTipContent />}
    </Wrapper>
  )
}

const TooltipButton = styled.button`
  border: none;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 0;
`

const Wrapper = styled.div`
  position: relative;
`
