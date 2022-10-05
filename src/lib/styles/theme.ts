import { Theme } from '@emotion/react';

export type ThemeType = 'dark' | 'light';

export type ThemeObject = { [key in ThemeType]: Theme };

export const themeObject: ThemeObject = { dark: { colors: { bg: '#000000' } }, light: { colors: { bg: '#ffffff' } } };
