import { Suspense } from "react"
import type { AppProps } from "next/app"
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "react-query"
import { css, Global } from "@emotion/react"
import { appleSDGNeo } from "@lib/styles/fonts"
import { ErrorBoundary } from "react-error-boundary"
import { ErrorView } from "@lib/components/Error"

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        suspense: true,
      },
    },
  })
  return (
    <QueryClientProvider client={queryClient}>
      <Global
        styles={css`
          html,
          body {
            padding: 0;
            margin: 0 auto;
            ${appleSDGNeo};
            max-width: 414px;
          }
          ::-webkit-scrollbar {
            display: none;
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
            <Suspense fallback={<h1>로딩중이에요</h1>}>
              <Component {...pageProps} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  )
}

export default MyApp
