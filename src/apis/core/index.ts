import { coreClient } from '@/clients/coreClient';
import { Args } from '@/utils/apiArgs';
import { getServerSideHeaders } from '@/utils/getServerSideHeaders';

import type {
  GetEmailVerificationResult,
  PostEmailVerificationCodeParams,
  PostEmailVerificationCodeResult,
  PostEmailVerificationParams,
  PostEmailVerificationResult,
} from './types';

export async function getEmailVerification(args: Args) {
  const endpoint = `/v1/user/email/verification`;
  const headers = getServerSideHeaders(args.context);

  const response = await coreClient.get<GetEmailVerificationResult>(endpoint, { headers });
  return response.data;
}

export async function postEmailVerification(args: Args<undefined, undefined, PostEmailVerificationParams>) {
  const endpoint = `/v1/user/email/verification`;
  const headers = getServerSideHeaders(args.context);

  const response = await coreClient.post<PostEmailVerificationResult>(endpoint, args.body, { headers });
  return response.data;
}

export async function postEmailVerificationCode(args: Args<undefined, undefined, PostEmailVerificationCodeParams>) {
  const endpoint = `/v1/user/email/verification/code`;
  const headers = getServerSideHeaders(args.context);

  const response = await coreClient.post<PostEmailVerificationCodeResult>(endpoint, args.body, { headers });
  return response.data;
}
