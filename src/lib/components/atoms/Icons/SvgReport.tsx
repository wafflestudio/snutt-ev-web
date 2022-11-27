import { useTheme } from '@emotion/react';
import { SVGProps } from 'react';

export const SvgReport = (props: SVGProps<SVGSVGElement>) => {
  const theme = useTheme();

  const stroke = theme.colors.icon.outlined.stroke;

  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.25 13.5C4.25 12.5335 5.0335 11.75 6 11.75H8.75V18.25H6C5.0335 18.25 4.25 17.4665 4.25 16.5V13.5ZM6 13.25C5.86193 13.25 5.75 13.3619 5.75 13.5V16.5C5.75 16.6381 5.86193 16.75 6 16.75H7.25V13.25H6Z"
        fill={stroke}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.75 13.4999V16.5001C23.0536 16.272 23.25 15.909 23.25 15.5V14.5C23.25 14.091 23.0536 13.728 22.75 13.4999ZM22 17.5V18.25C23.5188 18.25 24.75 17.0188 24.75 15.5V14.5C24.75 12.9812 23.5188 11.75 22 11.75V12.5H21.25V17.5H22Z"
        fill={stroke}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.89209 16.75H8.17692L9.60481 17.4639L11.7289 23.4114C12.1359 24.5511 11.291 25.75 10.0809 25.75H9.6769C8.96131 25.75 8.31782 25.3143 8.05206 24.6499L4.89209 16.75ZM7.10764 18.25L9.44478 24.0928C9.48274 24.1878 9.57467 24.25 9.6769 24.25H10.0809C10.2537 24.25 10.3744 24.0787 10.3163 23.9159L8.39491 18.5361L7.82281 18.25H7.10764Z"
        fill={stroke}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.25 8.46751C21.25 8.2913 21.0726 8.17039 20.9086 8.23482L8.75 13.0114V16.9891L20.9086 21.7657C21.0726 21.8301 21.25 21.7092 21.25 21.533V8.46751ZM20.3601 6.83869C21.5081 6.38768 22.75 7.23405 22.75 8.46751V21.533C22.75 22.7664 21.5081 23.6128 20.3601 23.1618L7.25 18.0114V11.9891L20.3601 6.83869Z"
        fill={stroke}
      />
    </svg>
  );
};
