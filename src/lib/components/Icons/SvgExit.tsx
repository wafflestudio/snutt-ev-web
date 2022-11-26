import { useTheme } from '@emotion/react';
import { SVGProps } from 'react';

const SvgExit = (props: SVGProps<SVGSVGElement>) => {
  const theme = useTheme();

  const stroke = theme.colors.icon.outlined.stroke;

  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill={stroke} d="m17.272 15.858 26.87 26.87-1.414 1.414-26.87-26.87z" />
      <path fill={stroke} d="m42.728 15.858 1.414 1.414-26.87 26.87-1.414-1.414z" />
    </svg>
  );
};

export default SvgExit;
