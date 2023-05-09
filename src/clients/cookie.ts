import Cookies from 'js-cookie';

import { truffleClient } from '@/truffle';
import { IS_SERVER } from '@/utils/env';

const xAccessToken = IS_SERVER ? '' : Cookies.get('x-access-token');
const xAccessApikey = IS_SERVER ? '' : Cookies.get('x-access-apikey');

if (xAccessApikey === undefined) truffleClient.capture(new Error('apikey not provided in cookie'));
if (xAccessToken === undefined) truffleClient.capture(new Error('token not provided in cookie'));

export { xAccessApikey, xAccessToken };
