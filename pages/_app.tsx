import { Suspense } from "react"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"
import { css, Global } from "@emotion/react"
import { appleSDGNeo } from "@lib/styles/fonts"

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
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
        `}
      />
      <Suspense fallback={<h1>로딩중이에요</h1>}>
        <Component {...pageProps} />
      </Suspense>
    </QueryClientProvider>
  )
}

export default MyApp
