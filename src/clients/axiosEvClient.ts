import axios from 'axios';
import { parse } from 'cookie';

import { IS_SERVER } from '@/lib/util/env';

export const evClient = axios.create(
  IS_SERVER
    ? { baseURL: process.env.SERVER_SIDE_EV_API_URL }
    : {
        baseURL: process.env.NEXT_PUBLIC_EV_API_URL,
        headers: {
          'x-access-token': parse(document.cookie)['x-access-token'] ?? '',
          'x-access-apikey': parse(document.cookie)['x-access-apikey'] ?? '',
        },
      },
);
