import { useTheme } from '@emotion/react';
import { SVGProps } from 'react';

const SvgFilter = (props: SVGProps<SVGSVGElement>) => {
  const theme = useTheme();

  const stroke = theme.colors.icon.outlined.stroke;

  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill={stroke}
        d="M10 13h23v2H10zM41 13h9v2h-9zM10 28h10v2H10zM28 28h22v2H28zM10 44h21v2H10zM39 44h11v2H39z"
      />
      <circle cx={24} cy={29} r={5} stroke={stroke} strokeWidth={2} />
      <circle cx={37} cy={14} r={5} stroke={stroke} strokeWidth={2} />
      <circle cx={35} cy={45} r={5} stroke={stroke} strokeWidth={2} />
    </svg>
  );
};

export default SvgFilter;
