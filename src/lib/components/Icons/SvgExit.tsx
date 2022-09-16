import * as React from "react";
import { SVGProps } from "react";

const SvgExit = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="#000" d="m17.272 15.858 26.87 26.87-1.414 1.414-26.87-26.87z" />
    <path fill="#000" d="m42.728 15.858 1.414 1.414-26.87 26.87-1.414-1.414z" />
  </svg>
);

export default SvgExit;
