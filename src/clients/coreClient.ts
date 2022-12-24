import Cookies from 'js-cookie';

import { IS_SERVER } from '@/utils/env';

import { createClient } from './utils';

export const coreClient = createClient(
  IS_SERVER
    ? { baseURL: process.env.SERVER_SIDE_CORE_API_URL }
    : {
        baseURL: process.env.NEXT_PUBLIC_CORE_API_URL,
        headers: {
          'x-access-token': Cookies.get('x-access-token') ?? '',
          'x-access-apikey': Cookies.get('x-access-apikey') ?? '',
        },
      },
);
