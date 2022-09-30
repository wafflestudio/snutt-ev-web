import { parse } from 'cookie';
import { GetServerSidePropsContext } from 'next';

import { APP_ENV } from '@/lib/util/env';

type ServerSideHeaders =
  | { Cookie: string } // test 환경일 때
  | { 'x-access-token': string; 'x-access-apikey': string }; // test 아닐 때

export const getServerSideHeaders = (context?: GetServerSidePropsContext): ServerSideHeaders | undefined => {
  if (context === undefined) return;
  if (context.req.headers.cookie === undefined) return;

  if (APP_ENV === 'test' && context.req.headers.cookie) return { Cookie: context.req.headers.cookie };

  const cookies = parse(context.req.headers.cookie);

  const token = cookies['x-access-token'];
  const apikey = cookies['x-access-apikey'];

  if (!token || !apikey) return;

  return {
    'x-access-token': token,
    'x-access-apikey': apikey,
  };
};
