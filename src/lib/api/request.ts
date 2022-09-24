import axios from 'axios';
import { parse } from 'cookie';
import { GetServerSidePropsContext } from 'next';

import { APP_ENV, IS_SERVER } from '@/lib/util/env';

type ServerSideHeaders =
  | { Cookie: string } // test 환경일 때
  | { 'x-access-token': string; 'x-access-apikey': string }; // test 아닐 때

export const getServerSideHeaders = (
  context?: GetServerSidePropsContext,
): ServerSideHeaders | undefined => {
  if (context === undefined) return;
  if (context.req.headers.cookie === undefined) return;

  if (APP_ENV === 'test' && context.req.headers.cookie)
    return { Cookie: context.req.headers.cookie };

  const cookies = parse(context.req.headers.cookie);

  const token = cookies['x-access-token'];
  const apikey = cookies['x-access-apikey'];

  if (!token || !apikey) return;

  return {
    'x-access-token': token,
    'x-access-apikey': apikey,
  };
};

export const coreClient = axios.create(
  IS_SERVER
    ? { baseURL: process.env.SERVER_SIDE_CORE_API_URL }
    : {
        baseURL: process.env.NEXT_PUBLIC_CORE_API_URL,
        headers: {
          'x-access-token':
            parse(document.cookie)['x-access-token'] ||
            process.env.NEXT_PUBLIC_LOCAL_ACCESS_TOKEN ||
            '',
          'x-access-apikey':
            parse(document.cookie)['x-access-apikey'] ||
            process.env.NEXT_PUBLIC_LOCAL_ACCESS_APIKEY ||
            '',
        },
      },
);

export const evClient = axios.create(
  IS_SERVER
    ? { baseURL: process.env.SERVER_SIDE_EV_API_URL }
    : {
        baseURL: process.env.NEXT_PUBLIC_EV_API_URL,
        headers: {
          'x-access-token':
            parse(document.cookie)['x-access-token'] ||
            process.env.NEXT_PUBLIC_LOCAL_ACCESS_TOKEN ||
            '',
          'x-access-apikey':
            parse(document.cookie)['x-access-apikey'] ||
            process.env.NEXT_PUBLIC_LOCAL_ACCESS_APIKEY ||
            '',
        },
      },
);
