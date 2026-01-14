import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { postEmailVerification, postEmailVerificationCode } from '@/apis/core';
import { Button } from '@/components/atoms/Button';
import SvgTimetableOn from '@/components/atoms/Icons/SvgTimetableOn';
import { Title01 } from '@/components/atoms/Typography';
import { AppBar } from '@/components/molecules/AppBar';
import { useInterval } from '@/hooks/useInterval';
import { useRerender } from '@/hooks/useRerender';
import { APP_ENV } from '@/utils/env';
import { get } from '@/utils/object/get';
import { SECOND } from '@/utils/time';

import { MailVerifyCodeInput } from './MailVerifyCodeInput';
import { MailVerifyEmailInput } from './MailVerifyEmailInput';
import { MailVerifyGuide } from './MailVerifyGuide';
import { MailVerifyHeader } from './MailVerifyHeader';
import { MailVerifyWarning } from './MailVerifyWarning';

const TIMER_DURATION = APP_ENV === 'test' ? 3 * SECOND : 180 * SECOND;

export const MailVerifyImpl = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const [isVerificationNumberRequested, setIsVerificationNumberRequested] = useState(false);
  const [timeoutDeadline, setTimeoutDeadline] = useState<number | null>(null);
  const [verificationState, setVerificationState] = useState(MailVerificationState.NONE);
  const [verificationErrorMessage, setVerificationErrorMessage] = useState<string | null>(null);

  const rerender = useRerender();

  useInterval(
    () => {
      if (timeoutDeadline !== null && timeoutDeadline < Date.now()) {
        setTimeoutDeadline(null);
        setVerificationState(MailVerificationState.TIMEOUT);
      }

      rerender();
    },
    { delay: 250, enabled: timeoutDeadline !== null },
  );

  const onRequestCode = async () => {
    try {
      await postEmailVerification({ body: { email: email + '@snu.ac.kr' } });

      setVerificationState(MailVerificationState.READY);
      setIsVerificationNumberRequested(true);
      setTimeoutDeadline(Date.now() + TIMER_DURATION);
    } catch (e) {
      const displayMessage = get(e, ['displayMessage']) as string;
      const errcode = get(e, ['errcode']) as number;

      const newState = errcode
        ? { 40901: MailVerificationState.VERFIED_FROM_OTHER_MAIL }[errcode] ?? MailVerificationState.TIMEOUT
        : MailVerificationState.TIMEOUT;

      setVerificationState(newState);
      setVerificationErrorMessage(displayMessage || '인증요청에 실패했습니다. 다시 시도해주세요');
    }
  };

  const onVerify = async () => {
    try {
      const res = await postEmailVerificationCode({ body: { code: Number(code) } });
      if (!res.is_email_verified) throw Error();
      router.replace('/main');
    } catch (e) {
      setVerificationState(MailVerificationState.INVALID_NUMBER);
    }
  };

  return (
    <Wrapper>
      <AppBar left={<SvgTimetableOn height={30} width={30} />}>
        <Title01 style={{ marginLeft: 12 }}>이메일 인증</Title01>
      </AppBar>

      <Content>
        <MailVerifyHeader />

        <MailVerifyEmailInput
          email={email}
          hasRequested={isVerificationNumberRequested}
          onRequest={onRequestCode}
          onChangeEmail={setEmail}
        />

        <MailVerifyCodeInput
          code={code}
          onChangeCode={(c) => {
            if (verificationState === MailVerificationState.INVALID_NUMBER)
              setVerificationState(MailVerificationState.READY);
            setCode(c);
          }}
          timeoutDeadline={timeoutDeadline}
          isVerificationNumberRequested={isVerificationNumberRequested}
        />

        <MailVerifyWarning message={verificationErrorMessage} />

        <CompleteButton
          onClick={onVerify}
          disabled={verificationState !== MailVerificationState.READY}
          data-testid="verify-submit-button"
        >
          완료
        </CompleteButton>
        {verificationState === MailVerificationState.VERFIED_FROM_OTHER_MAIL && <MailVerifyGuide />}
      </Content>
    </Wrapper>
  );
};

export enum MailVerificationState {
  TOO_MANY_REQUEST,
  TIMEOUT,
  INVALID_NUMBER,
  ALREADY_VERIFIED,
  VERFIED_FROM_OTHER_MAIL,
  NONE,
  READY,
}

const Wrapper = styled.div``;

const Content = styled.div`
  padding: 22px 20px 0 20px;
`;

const CompleteButton = styled(Button)`
  margin-top: 25px;
  width: 100%;
  height: 60px;
`;
