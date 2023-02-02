import { ThemeProvider } from '@emotion/react';
import { Hydrate, QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorTemplate } from '@/components/templates/ErrorTemplate';
import { NativeBridgeProvider } from '@/contexts/nativeBridge';
import { NativeDeviceProvider, useNativeDevice } from '@/contexts/nativeDevice';
import { useApplicationThemeType } from '@/hooks/useApplicationThemeType';
import { useMSW } from '@/mocks/integrations/browser';
import { GlobalStyles } from '@/styles/global';
import { themeObject, ThemeType } from '@/styles/theme';
import { APP_ENV, IS_SERVER } from '@/utils/env';

const isDevtool = process.env.NEXT_PUBLIC_REACT_QUERY_DEVTOOL === 'true';
const isMSW = APP_ENV === 'test';
const isBrowserMSW = !IS_SERVER && isMSW;
const isServerMSW = IS_SERVER && isMSW;

if (!IS_SERVER) {
  window.git = { sha: process.env.NEXT_PUBLIC_GIT_SHA ?? '', tag: process.env.NEXT_PUBLIC_GIT_TAG ?? '' };
}

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
  new QueryClient({ defaultOptions: { queries: { retry: 0, refetchOnWindowFocus: false } } });

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: unknown; theme: ThemeType }>) {
  const { changeThemeType, themeType } = useApplicationThemeType(pageProps.theme);
  const [queryClient] = useState(createQueryClient);
  const isMSWEnabled = useMSW(isBrowserMSW);

  // native -> webview 통신을 위한 함수들 셋업
  useEffect(() => {
    window.changeTheme = changeThemeType;
  }, [changeThemeType]);

  if (isMSW && !isMSWEnabled) return;

  return (
    <NativeDeviceProvider>
      <NativeBridgeProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        </Head>
        <ThemeProvider theme={themeObject[themeType]}>
          <GlobalStyles />
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <QueryErrorResetBoundary>
                {({ reset }) => (
                  <ErrorBoundary onReset={reset} fallbackRender={() => <ErrorTemplate />}>
                    <Suspense fallback={null}>
                      <Component {...pageProps} />
                    </Suspense>
                  </ErrorBoundary>
                )}
              </QueryErrorResetBoundary>
              {isDevtool && <ReactQueryDevtools initialIsOpen={false} />}
            </Hydrate>
          </QueryClientProvider>
        </ThemeProvider>
      </NativeBridgeProvider>
      <DangerousIosScrollRestorationHelper />
    </NativeDeviceProvider>
  );
}

export default MyApp;

// https://wafflestudio.slack.com/archives/C0PAVPS5T/p1675007677638799?thread_ts=1673436263.985449&cid=C0PAVPS5T
const DangerousIosScrollRestorationHelper = () => {
  const { nativeDeviceType } = useNativeDevice();

  useEffect(() => {
    if (nativeDeviceType === 'ios') window.history.scrollRestoration = 'auto';
    else window.history.scrollRestoration = 'manual';
  }, [nativeDeviceType]);

  return null;
};
