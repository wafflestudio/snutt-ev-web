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
          /* iOS에서 버튼 tab 하이라이트 색 제거 */
          -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

          /* iOS에서 링크 롱터치시 미리보기 되는 거 방지 */
          -webkit-touch-callout: none;

          /* iOS에서 text 롱터치로 선택되는 거 방지 */
          -webkit-touch-callout: none;
        }

        input:focus {
          /* input 테두리 파란색 제거 */
          outline: none;
        }
      `}
    />
  );
};
