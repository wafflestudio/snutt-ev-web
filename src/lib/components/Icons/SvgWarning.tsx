import * as React from "react";
import { SVGProps } from "react";

const SvgWarning = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="15" cy="15" r="9" stroke={props.color} strokeWidth="1.5" />
    <circle cx="15" cy="20" r="1" fill={props.color} />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.0055 10.0585C13.9697 9.48487 14.4253 9 15 9C15.5747 9 16.0303 9.48487 15.9945 10.0585L15.5633 16.9708C15.5447 17.2682 15.2981 17.5 15 17.5C14.702 17.5 14.4553 17.2682 14.4367 16.9708L14.0055 10.0585Z"
      fill={props.color}
    />
  </svg>
);

export default SvgWarning;
