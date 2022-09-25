import { css, Global } from '@emotion/react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorView } from '@/lib/components/Error';
import { appleSDGNeo } from '@/lib/styles/fonts';
import { APP_ENV, IS_SERVER } from '@/lib/util/env';
import { useMSW } from '@/mocks/integrations/browser';

const isDevtool = process.env.NEXT_PUBLIC_REACT_QUERY_DEVTOOL === 'true';
const isMSW = APP_ENV === 'test';
const isBrowserMSW = !IS_SERVER && isMSW;
const isServerMSW = IS_SERVER && isMSW;

if (isServerMSW) {
  (async () => {
    try {
      const { server } = await import('../mocks/integrations/server');
      server.listen({ onUnhandledRequest: 'bypass' });
      console.debug('Server MSW Enabled');
    } catch (err) {
      console.debug('Server MSW Failed');
    }
  })();
}

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
      },
    },
  });

function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: unknown }>) {
  const [queryClient] = useState(createQueryClient);
  const isMSWEnabled = useMSW(isBrowserMSW);

  if (isMSW && !isMSWEnabled) return;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Global
          styles={css`
            html,
            body {
              padding: 0;
              margin: 0 auto;
              ${appleSDGNeo};
              max-width: 768px;
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
        <Hydrate state={pageProps.dehydratedState}>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                onReset={reset}
                fallbackRender={({ resetErrorBoundary }) => (
                  <ErrorView resetErrorBoundary={resetErrorBoundary} />
                )}
              >
                <Suspense fallback={null}>
                  <Component {...pageProps} />
                </Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
          {isDevtool && <ReactQueryDevtools initialIsOpen={false} />}
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
