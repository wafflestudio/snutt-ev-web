import styled from '@emotion/styled';

import { Detail } from '@/lib/components/atoms/Typography';
import { COLORS } from '@/lib/styles/colors';
import { MailVerificationState } from '@/pageImpl/mailVerifyImpl';

type Props = { state: MailVerificationState };

export const MailVerifyWarning = ({ state }: Props) => {
  const WARINING = {
    [MailVerificationState.TIMEOUT]: '인증요청에 실패했습니다. 다시 시도해주세요',
    [MailVerificationState.INVALID_NUMBER]: '인증번호가 틀렸습니다. 다시 시도해주세요',
    [MailVerificationState.ALREADY_VERIFIED]: '이미 인증된 계정입니다',
    [MailVerificationState.VERFIED_FROM_OTHER_MAIL]: '이미 사용된 메일입니다',
    [MailVerificationState.TOO_MANY_REQUEST]: '인증요청에 실패했습니다. 3분 후에 다시 시도해주세요',
    [MailVerificationState.NONE]: '',
    [MailVerificationState.READY]: '',
  };

  return (
    <WarningText>
      <Detail style={{ color: COLORS.red }} data-testid="verify-warning-text">
        {WARINING[state]}
      </Detail>
    </WarningText>
  );
};

const WarningText = styled.div`
  height: 15px;
`;
