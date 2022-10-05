import { Theme } from '@emotion/react';

import { COLORS } from './colors';

export type ThemeType = 'dark' | 'light';

export type ThemeObject = { [key in ThemeType]: Theme };

export const themeObject: ThemeObject = {
  light: {
    colors: {
      bg: COLORS.white,
      text: {
        default: COLORS.black,
        info: COLORS.gray2,
        link: COLORS.darkGray,
        toggle: COLORS.darkGray,
        desc: COLORS.darkGray,
      },
      icon: {
        filled: {
          fill: COLORS.black,
          stroke: COLORS.white,
        },
        outlined: {
          fill: COLORS.white,
          stroke: COLORS.black,
        },
      },
    },
  },
  dark: {
    colors: {
      bg: '#2B2B2B',
      text: {
        default: COLORS.white,
        info: COLORS.gray2,
        link: COLORS.darkGray,
        toggle: COLORS.gray,
        desc: COLORS.darkGray,
      },
      icon: {
        filled: {
          fill: COLORS.white,
          stroke: COLORS.black,
        },
        outlined: {
          fill: COLORS.black,
          stroke: COLORS.white,
        },
      },
    },
  },
};
