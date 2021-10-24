import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"
import { css, Global } from "@emotion/react"
import { appleSDGNeo } from "@lib/styles/fonts"

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Global
        styles={css`
          html,
          body {
            padding: 0;
            margin: 0;
            ${appleSDGNeo}
          }
        `}
      />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
