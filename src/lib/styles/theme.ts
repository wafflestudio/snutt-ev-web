import { Theme } from '@emotion/react';

export type ThemeType = 'dark' | 'light';

export type ThemeObject = { [key in ThemeType]: Theme };

export const themeObject: ThemeObject = { dark: { colors: { bg: '#2B2B2B' } }, light: { colors: { bg: '#ffffff' } } };
