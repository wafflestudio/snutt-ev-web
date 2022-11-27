import { useTheme } from '@emotion/react';
import { SVGProps } from 'react';

const SvgTimetableOn = (props: SVGProps<SVGSVGElement>) => {
  const { colors } = useTheme();

  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask id="timetable_on_svg__a" fill={colors.icon.filled.stroke}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M28 10H10v24h18V10Zm22 16H32v24h18V26ZM32 10h18v12H32V10Zm-4 28H10v12h18V38Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28 10H10v24h18V10Zm22 16H32v24h18V26ZM32 10h18v12H32V10Zm-4 28H10v12h18V38Z"
        fill={colors.icon.filled.fill}
      />
      <path
        d="M10 10V9H9v1h1Zm18 0h1V9h-1v1ZM10 34H9v1h1v-1Zm18 0v1h1v-1h-1Zm4-8v-1h-1v1h1Zm18 0h1v-1h-1v1ZM32 50h-1v1h1v-1Zm18 0v1h1v-1h-1Zm0-40h1V9h-1v1Zm-18 0V9h-1v1h1Zm18 12v1h1v-1h-1Zm-18 0h-1v1h1v-1ZM10 38v-1H9v1h1Zm18 0h1v-1h-1v1ZM10 50H9v1h1v-1Zm18 0v1h1v-1h-1ZM10 11h18V9H10v2Zm1 23V10H9v24h2Zm17-1H10v2h18v-2Zm-1-23v24h2V10h-2Zm5 17h18v-2H32v2Zm1 23V26h-2v24h2Zm17-1H32v2h18v-2Zm-1-23v24h2V26h-2Zm1-17H32v2h18V9Zm1 13V10h-2v12h2Zm-19 1h18v-2H32v2Zm-1-13v12h2V10h-2ZM10 39h18v-2H10v2Zm1 11V38H9v12h2Zm17-1H10v2h18v-2Zm-1-11v12h2V38h-2Z"
        fill={colors.icon.filled.fill}
        mask="url(#timetable_on_svg__a)"
      />
    </svg>
  );
};

export default SvgTimetableOn;
