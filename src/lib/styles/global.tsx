import { css, Global, useTheme } from '@emotion/react';

import { appleSDGNeo } from './fonts';

export const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        html,
        body {
          padding: 0;
          margin: 0 auto;
          ${appleSDGNeo};
          max-width: 768px;
          background-color: ${theme.colors.bg.default};
        }

        * {
          /* tab 하이라이트 색 제거 */
          -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        }

        input:focus {
          /* input 테두리 파란색 제거 */
          outline: none;
        }
      `}
    />
  );
};
