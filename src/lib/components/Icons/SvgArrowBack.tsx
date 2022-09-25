import { SVGProps } from 'react';

const SvgArrowBack = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M36.97 15.414 35.557 14 21.414 28.142 20 29.556l1.414 1.415 14.142 14.142 1.415-1.414-14.142-14.143L36.97 15.414Z"
      fill="#000"
    />
  </svg>
);

export default SvgArrowBack;
