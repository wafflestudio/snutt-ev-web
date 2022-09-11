import { css, Global } from "@emotion/react"
import { appleSDGNeo } from "@lib/styles/fonts"
import { MailVerifyImpl } from "@pageImpl/mailVerifyImpl"
import Head from "next/head"

export default function Index() {
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
      <MailVerifyImpl setVerification={() => null} />
    </>
  )
}
