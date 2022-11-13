import { APP_ENV } from '@/lib/util/env';

export const LIKE_FEATURE = APP_ENV === 'prod' ? false : true;
