import { SVGProps } from 'react';

const SvgChevronRight = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="10" height="10" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.58532 20.2376L10.481 21.1333L19.4377 12.1766L20.3333 11.2809L19.4377 10.3853L10.481 1.42859L9.58532 2.32426L18.542 11.2809L9.58532 20.2376Z"
        fill="#777777"
      />
    </svg>
  );
};

export default SvgChevronRight;
