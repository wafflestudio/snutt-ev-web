import { css, Global } from '@emotion/react';
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorView } from '@/lib/components/Error';
import { appleSDGNeo } from '@/lib/styles/fonts';
import { APP_ENV, IS_SERVER } from '@/lib/util/env';
import { useMSW } from '@/mocks/integrations/browser';

const isDevtool = process.env.NEXT_PUBLIC_REACT_QUERY_DEVTOOL === 'true';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
      refetchOnWindowFocus: false,
    },
  },
});

const isBrowserMSW = !IS_SERVER && APP_ENV === 'test';

function MyApp({ Component, pageProps }: AppProps) {
  const isMSWEnabled = useMSW(isBrowserMSW);

  if (isBrowserMSW && !isMSWEnabled) return;

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
          `}
        />

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
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
