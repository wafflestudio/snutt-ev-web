import '@emotion/react';

import { SnuttTheme } from '@/lib/dto/theme';

declare module '@emotion/react' {
  export interface Theme extends SnuttTheme {
    colors: { bg: string };
  }
}
