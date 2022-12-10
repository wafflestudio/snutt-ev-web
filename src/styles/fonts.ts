import { css } from '@emotion/react';

const assetBaseURL = process.env.NEXT_PUBLIC_SNUTT_ASSETS_URL;

const appleSDGothicNeoLUrl = `${assetBaseURL}/fonts/AppleSDGothicNeoL.ttf`;
const appleSDGothicNeoBUrl = `${assetBaseURL}/fonts/AppleSDGothicNeoB.ttf`;

export const appleSDGNeo = css`
  @font-face {
    font-family: 'AppleSDGothicNeo';
    src: local(-apple-system), url(${appleSDGothicNeoLUrl});
    font-weight: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'AppleSDGothicNeo';
    src: local(-apple-system), url(${appleSDGothicNeoBUrl});
    font-weight: bold;
    font-display: swap;
  }
`;
