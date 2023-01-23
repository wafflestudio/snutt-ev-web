import Cookies from 'js-cookie';

import { truffleClient } from '@/truffle';

const xAccessToken = Cookies.get('x-access-token');
const xAccessApikey = Cookies.get('x-access-apikey');

if (!xAccessApikey) truffleClient.capture(new Error('apikey not provided in cookie'));
if (!xAccessToken) truffleClient.capture(new Error('token not provided in cookie'));

export { xAccessApikey, xAccessToken };
