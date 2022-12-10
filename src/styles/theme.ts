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
        divider: COLORS.black03,
      },
      text: {
        default: COLORS.black,
        info: COLORS.gray2,
        link: COLORS.darkGray,
        toggle: COLORS.darkGray,
        desc: COLORS.darkGray,
        form: COLORS.darkerGray,
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
        divider: COLORS.lightGray,
        form: COLORS.gray2,
        info: COLORS.gray20,
      },
      button: {
        primary: {
          default: { bg: COLORS.mint, text: COLORS.white },
          disabled: { bg: COLORS.gray20, text: COLORS.white },
        },
        secondary: {
          default: { bg: COLORS.transparent, text: COLORS.mint },
          disabled: { bg: COLORS.transparent, text: COLORS.gray2 },
        },
      },
    },
  },
  dark: {
    colors: {
      bg: {
        default: '#2B2B2B',
        form: COLORS.darkerGray,
        info: COLORS.darkerGray,
        divider: COLORS.darkerGray,
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
        divider: COLORS.darkGray,
        form: COLORS.darkGray,
        info: COLORS.darkGray,
      },
      button: {
        primary: {
          default: { bg: COLORS.darkMint, text: COLORS.white },
          disabled: { bg: COLORS.gray2, text: COLORS.white },
        },
        secondary: {
          default: { bg: COLORS.transparent, text: COLORS.darkMint },
          disabled: { bg: COLORS.transparent, text: COLORS.gray2 },
        },
      },
    },
  },
};
