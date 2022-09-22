import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { getEmailVerification } from '@/lib/api/apis';

type Clients = { queryClient: QueryClient };

type Options = {
  emailVerification:
    | 'verified' // 인증되었어야
    | 'not-verified' // 인증되지 않았어야
    | undefined; // 상관없음
};

type Callback = (
  context: GetServerSidePropsContext,
  clients: Clients,
) => ReturnType<GetServerSideProps>;

export const withGetServerSideProps = (
  callback: Callback,
  options: Partial<Options> = {},
): GetServerSideProps => {
  return async (context) => {
    const { emailVerification } = options;

    if (emailVerification) {
      const { is_email_verified } = await getEmailVerification({ context });

      // 인증되어야 하는데 인증 안됐으면 인증 페이지로
      if (!is_email_verified && emailVerification === 'verified')
        return { redirect: { destination: '/verify', permanent: false } };

      // 인증되었으면 안되는데 인증됐으면 메인 페이지로
      if (is_email_verified && emailVerification === 'not-verified')
        return { redirect: { destination: '/main', permanent: false } };
    }

    const queryClient = new QueryClient();
    const ret = await callback(context, { queryClient });

    if (!('props' in ret)) {
      return ret;
    }

    // 아래 이슈 때문에 stringify 후 parse 해서 undefined 를 없애 준다.
    // https://github.com/TanStack/query/issues/1458
    const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

    console.log(dehydratedState);

    return { props: { ...ret.props, dehydratedState } };
  };
};
