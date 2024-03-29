import { SVGProps } from 'react';

const pathProps = { fillRule: 'evenodd', clipRule: 'evenodd', fill: '#777777' } as const;

export const SvgMoreVertical = (props: SVGProps<SVGSVGElement>) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M5 6C5 5.44772 5.44772 5 6 5C6.55228 5 7 5.44772 7 6C7 6.55228 6.55228 7 6 7C5.44772 7 5 6.55228 5 6Z"
      {...pathProps}
    />
    <path
      d="M5 2.5C5 1.94772 5.44772 1.5 6 1.5C6.55228 1.5 7 1.94772 7 2.5C7 3.05228 6.55228 3.5 6 3.5C5.44772 3.5 5 3.05228 5 2.5Z"
      {...pathProps}
    />
    <path
      d="M5 9.5C5 8.94772 5.44772 8.5 6 8.5C6.55228 8.5 7 8.94772 7 9.5C7 10.0523 6.55228 10.5 6 10.5C5.44772 10.5 5 10.0523 5 9.5Z"
      {...pathProps}
    />
  </svg>
);
