export type GetEmailVerificationResult = { is_email_verified: boolean };
export type PostEmailVerificationResult = unknown;
export type PostEmailVerificationParams = { email: string };
export type PostEmailVerificationCodeParams = { code: number };
export type PostEmailVerificationCodeResult = { is_email_verified: boolean };
