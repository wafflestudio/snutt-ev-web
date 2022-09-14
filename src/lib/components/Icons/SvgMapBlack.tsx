import * as React from "react"
import { SVGProps } from "react"

const SvgMapBlack = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <ellipse cx={15} cy={11.889} rx={3.667} ry={3.63} fill="#000" />
    <path
      d="M7.188 18.069A9.785 9.785 0 0 1 5 11.895C5 6.44 9.468 2 15 2s10 4.44 10 9.895c0 2.337-.82 4.481-2.19 6.179l-4.761 5.89-3.05 3.772-7.811-9.667Z"
      stroke="#000"
      strokeWidth={2}
    />
  </svg>
)

export default SvgMapBlack
