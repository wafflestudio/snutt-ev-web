import { IS_SERVER } from '@/utils/env';

import { xAccessApikey, xAccessToken } from './cookie';
import { createClient } from './utils';

export const coreClient = createClient(
  IS_SERVER
    ? { baseURL: process.env.SERVER_SIDE_CORE_API_URL }
    : {
        baseURL: process.env.NEXT_PUBLIC_CORE_API_URL,
        headers: { 'x-access-token': xAccessToken ?? '', 'x-access-apikey': xAccessApikey ?? '' },
      },
);
