import { css, Global } from "@emotion/react"
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { AppProps } from "next/app"
import Head from "next/head"
import { Suspense, useEffect } from "react"
import { ErrorBoundary } from "react-error-boundary"

import { getEmailVerification } from "@/lib/api/apis"
import { ErrorView } from "@/lib/components/Error"
import useCookie from "@/lib/hooks/useCookie"
import { appleSDGNeo } from "@/lib/styles/fonts"
import { useMSW } from "@/mocks/integrations/browser"
import { MailVerifyImpl } from "@/pageImpl/mailVerifyImpl"

const isDevtool = process.env.NEXT_PUBLIC_REACT_QUERY_DEVTOOL === "true"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  useMSW(false) // TODO: apply browser integration

  const [isEmailVerified, updateEmailVerifedCookie] =
    useCookie("email-verified")

  useEffect(() => {
    const checkEmailVerification = async () => {
      const res = await getEmailVerification()
      updateEmailVerifedCookie(`${!!res.is_email_verified}`)
    }

    checkEmailVerification()
  }, [updateEmailVerifedCookie])

  if (isEmailVerified === null) {
    return
  }

  if (isEmailVerified === "false") {
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
        </Head>
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
        <MailVerifyImpl setVerification={updateEmailVerifedCookie} />
      </>
    )
  }

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
              <Suspense fallback={<></>}>
                <Component {...pageProps} />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
        {isDevtool && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </>
  )
}

export default MyApp
