import { ClickAwayListener, TooltipProps } from "@mui/material"
import { TootTipContent } from "@pageImpl/createImpl/__components__/ToolTipContent"
import SvgTooltip from "@lib/components/Icons/SvgTooltip"
import styled from "@emotion/styled"
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip"
import { useState } from "react"

export const RatingTooltip = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false)

  return
  ;<TootTipContent />
  // return (
  //   <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
  //     <CustomTooltip
  //       PopperProps={{
  //         disablePortal: true,
  //       }}
  //       onClose={() => setTooltipOpen(false)}
  //       open={tooltipOpen}
  //       disableFocusListener
  //       disableHoverListener
  //       disableTouchListener
  //       title={<TootTipContent />}
  //       arrow
  //     >
  //       <TooltipButton onClick={() => setTooltipOpen(true)}>
  //         <SvgTooltip width={30} height={30} />
  //       </TooltipButton>
  //     </CustomTooltip>
  //   </ClickAwayListener>
  // )
}

const TooltipButton = styled.button`
  border: none;
  background-color: white;
  display: flex;
  align-items: center;
  //background-color: black;
`

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    // backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    // boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))

const CustomTooltip = styled(Tooltip)`
  & .MuiTooltip-tooltip {
    background-color: black;
  }
`
