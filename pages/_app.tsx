import { Suspense, useEffect } from "react"
import type { AppProps } from "next/app"
import Head from "next/head"
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "react-query"
import { css, Global } from "@emotion/react"
import { appleSDGNeo } from "@lib/styles/fonts"
import { ErrorBoundary } from "react-error-boundary"
import { ErrorView } from "@lib/components/Error"
import { MailVerifyImpl } from "@pageImpl/mailVerifyImpl"
import useCookie from "@lib/hooks/useCookie"
import { getEmailVerification } from "@lib/api/apis"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  const [isEmailVerified, updateEmailVerifedCookie, _] =
    useCookie("email-verified")

  const checkEmailVerification = async () => {
    const res = await getEmailVerification()
    if (res.is_email_verified) {
      updateEmailVerifedCookie("true")
    } else {
      updateEmailVerifedCookie("false")
    }
  }

  useEffect(() => {
    checkEmailVerification()
  }, [])

  if (isEmailVerified === "false" || isEmailVerified === null) {
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
      </QueryClientProvider>
    </>
  )
}

export default MyApp
