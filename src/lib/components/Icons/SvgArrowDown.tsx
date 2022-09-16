import * as React from 'react';
import { SVGProps } from 'react';

const SvgArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 22 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m1.088.353-.98.943 9.805 9.428.98.943.98-.943 9.806-9.428-.98-.943-9.806 9.428L1.088.353Z"
      fill="#000"
    />
  </svg>
);

export default SvgArrowDown;
