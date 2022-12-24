import axios from 'axios';
import Cookies from 'js-cookie';

import { IS_SERVER } from '@/utils/env';

import { Client } from './utils';

export const coreClient = axios.create(
  IS_SERVER
    ? { baseURL: process.env.SERVER_SIDE_CORE_API_URL }
    : {
        baseURL: process.env.NEXT_PUBLIC_CORE_API_URL,
        headers: {
          'x-access-token': Cookies.get('x-access-token') ?? '',
          'x-access-apikey': Cookies.get('x-access-apikey') ?? '',
        },
      },
) as Client;
