import { dehydrate, QueryClient } from '@tanstack/react-query';
import { parse, serialize } from 'cookie';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { getEmailVerification } from '@/apis/core';
import { ThemeType } from '@/styles/theme';
import { truffleClient } from '@/truffle';

type Clients = { queryClient: QueryClient };

type Options = {
  emailVerification:
    | 'verified' // 인증되었어야
    | 'not-verified' // 인증되지 않았어야
    | undefined; // 상관없음
};

type Callback<P extends { [key: string]: unknown }> = (
  context: GetServerSidePropsContext,
  clients: Clients,
) => ReturnType<GetServerSideProps<P>>;

const EMAIL_VERIFICATION_COOKIE = 'is-email-verified';

export const withGetServerSideProps = <P extends { [key: string]: unknown }>(
  callback: Callback<P>,
  options: Partial<Options> = {},
): GetServerSideProps => {
  return async (context) => {
    try {
      const cookie = parse(context.req.headers.cookie ?? ''); // experimental. TODO: 제대로
      const alreadyEmailVerified = Boolean(cookie[EMAIL_VERIFICATION_COOKIE]);

      const { emailVerification } = options;

      if (emailVerification) {
        const { is_email_verified } = alreadyEmailVerified
          ? { is_email_verified: true }
          : await getEmailVerification({ context });

        if (is_email_verified) {
          const emailVerifiedCookie = serialize(EMAIL_VERIFICATION_COOKIE, String(is_email_verified), {
            httpOnly: true,
          });

          context.res.setHeader('Set-Cookie', emailVerifiedCookie);
        }

        // 인증되어야 하는데 인증 안됐으면 인증 페이지로
        if (!is_email_verified && emailVerification === 'verified') {
          const url = context.req.url;
          const params = new URLSearchParams();
          url && !url.startsWith('/main') && params.set('from', url);

          return { redirect: { destination: `/verify?${params}`, permanent: false } };
        }

        // 인증되었으면 안되는데 인증됐으면 메인 페이지로
        if (is_email_verified && emailVerification === 'not-verified')
          return { redirect: { destination: '/main', permanent: false } };
      }

      const theme: ThemeType = cookie.theme === 'dark' ? 'dark' : 'light';

      const queryClient = new QueryClient();
      const ret = await callback(context, { queryClient });

      if (!('props' in ret)) {
        return ret;
      }

      // 아래 이슈 때문에 stringify 후 parse 해서 undefined 를 없애 준다.
      // https://github.com/TanStack/query/issues/1458
      const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

      return { props: { ...ret.props, dehydratedState, theme } };
    } catch (err) {
      if (err instanceof Error) truffleClient.capture(err);
      else {
        const errorString = `${err}` === `${{}}` ? JSON.stringify(err) : `${err}`;
        truffleClient.capture(new Error(`unknown withGetServerSideProps error: ${errorString}`));
      }
      throw err;
    }
  };
};
