import { Theme } from '@emotion/react';

import { COLORS } from './colors';

export type ThemeType = 'dark' | 'light';

export type ThemeObject = { [key in ThemeType]: Theme };

export const themeObject: ThemeObject = {
  light: {
    colors: {
      bg: {
        default: COLORS.white,
        form: COLORS.lighterGray,
        info: COLORS.gray,
      },
      text: {
        default: COLORS.black,
        info: COLORS.gray2,
        link: COLORS.darkGray,
        toggle: COLORS.darkGray,
        desc: COLORS.darkGray,
        form: COLORS.darkGray,
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
      border: {
        light: COLORS.lightGray,
        form: COLORS.gray2,
        info: COLORS.gray20,
      },
    },
  },
  dark: {
    colors: {
      bg: {
        default: '#2B2B2B',
        form: COLORS.darkerGray,
        info: COLORS.darkerGray,
      },
      text: {
        default: COLORS.white,
        info: COLORS.gray2,
        link: COLORS.darkGray,
        toggle: COLORS.gray,
        desc: COLORS.darkGray,
        form: COLORS.gray,
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
      border: {
        light: COLORS.lightGray,
        form: COLORS.darkGray,
        info: COLORS.darkGray,
      },
    },
  },
};
