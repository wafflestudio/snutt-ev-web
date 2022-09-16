import * as React from "react";
import { SVGProps } from "react";

const SvgExitWhite = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="#fff" d="M7.8 7 23 22.2l-.8.8L7 7.8z" />
    <path fill="#fff" d="m22.2 7 .8.8L7.8 23l-.8-.8z" />
  </svg>
);

export default SvgExitWhite;
