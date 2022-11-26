import { useTheme } from '@emotion/react';
import { SVGProps } from 'react';

export const SvgTrash = (props: SVGProps<SVGSVGElement>) => {
  const theme = useTheme();

  const stroke = theme.colors.icon.outlined.stroke;

  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="8.5" y="23.5" width="13" height="1" rx="0.5" fill={stroke} />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.79805 10.5436C8.07314 10.5195 8.31565 10.723 8.33972 10.9981L9.47274 23.9486C9.49681 24.2237 9.29332 24.4662 9.01823 24.4903V24.4903C8.74313 24.5144 8.50062 24.3109 8.47655 24.0358L7.34353 11.0853C7.31946 10.8102 7.52295 10.5676 7.79805 10.5436V10.5436Z"
        fill={stroke}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22.2183 10.5433C22.4934 10.5674 22.6969 10.8099 22.6729 11.085L21.5398 24.0355C21.5158 24.3106 21.2732 24.5141 20.9982 24.4901V24.4901C20.7231 24.466 20.5196 24.2235 20.5436 23.9484L21.6767 10.9979C21.7007 10.7228 21.9432 10.5193 22.2183 10.5433V10.5433Z"
        fill={stroke}
      />
      <rect x="6.75" y="7.75" width="16.5" height="0.5" rx="0.25" stroke={stroke} stroke-width="0.5" />
      <rect x="12.75" y="12.25" width="0.5" height="7.5" rx="0.25" stroke={stroke} stroke-width="0.5" />
      <path
        d="M14 6.25H16C16.6904 6.25 17.25 6.80964 17.25 7.5V7.75H12.75V7.5C12.75 6.80964 13.3096 6.25 14 6.25Z"
        stroke={stroke}
        stroke-width="1.5"
      />
      <rect x="16.75" y="12.25" width="0.5" height="7.5" rx="0.25" stroke={stroke} stroke-width="0.5" />
    </svg>
  );
};
