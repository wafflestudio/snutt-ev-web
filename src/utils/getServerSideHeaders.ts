import { parse } from 'cookie';
import { GetServerSidePropsContext } from 'next';

import { APP_ENV } from '@/utils/env';

type ServerSideHeaders =
  | { Cookie: string; 'Accept-Language'?: string } // test 환경일 때
  | { 'x-access-token': string; 'x-access-apikey': string; 'Accept-Language'?: string }; // test 아닐 때

export const getServerSideHeaders = (context?: GetServerSidePropsContext): ServerSideHeaders | undefined => {
  if (context === undefined) return;
  if (context.req.headers.cookie === undefined) return;

  const acceptLanguage = context.req.headers['accept-language'];

  if (APP_ENV === 'test' && context.req.headers.cookie)
    return { Cookie: context.req.headers.cookie, ...(acceptLanguage && { 'Accept-Language': acceptLanguage }) };

  const cookies = parse(context.req.headers.cookie);

  const token = cookies['x-access-token'];
  const apikey = cookies['x-access-apikey'];

  if (!token || !apikey) return;

  return {
    'x-access-token': token,
    'x-access-apikey': apikey,
    ...(acceptLanguage && { 'Accept-Language': acceptLanguage }),
  };
};
