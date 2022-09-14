export interface PostEmailVerificationParams {
  email: string
}

export interface PostEmailVerificationResult {}

export interface PostEmailVerificationCodeParams {
  code: number
}

export interface PostEmailVerificationCodeResult {
  is_email_verified: boolean
}
