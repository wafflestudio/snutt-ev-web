export type { Lang } from '@/utils/lang';

export const strings = {
  ko: {
    appBarTitle: '이메일 인증',
    headerLine1: '강의평 서비스 이용을 위해',
    headerLine2: '이메일 인증이 필요합니다.',
    emailLabel: '이메일',
    emailPlaceholder: '이메일을 입력하세요',
    requestCode: '인증요청',
    requestCodeAgain: '다시 요청',
    codeLabel: '인증번호',
    codePlaceholder: '인증번호 6자리를 입력하세요',
    complete: '완료',
    requestFailed: '인증요청에 실패했습니다. 다시 시도해주세요',
    guideTitle: '"이미 사용된 메일입니다"라는 문구가 떴나요?',
  },
  en: {
    appBarTitle: 'Email Verification',
    headerLine1: 'Email verification is required',
    headerLine2: 'to use the course review service.',
    emailLabel: 'Email',
    emailPlaceholder: 'Enter your email',
    requestCode: 'Request',
    requestCodeAgain: 'Resend',
    codeLabel: 'Verification Code',
    codePlaceholder: 'Enter 6-digit code',
    complete: 'Complete',
    requestFailed: 'Verification request failed. Please try again.',
    guideTitle: 'Did you see "Email already in use"?',
  },
} as const;

export type Strings = (typeof strings)['ko'];
