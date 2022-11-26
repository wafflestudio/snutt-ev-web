import styled from '@emotion/styled';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { postEmailVerification, postEmailVerificationCode } from '@/lib/apis/core';
import { AppBar } from '@/lib/components/Appbar';
import { Button } from '@/lib/components/Button';
import SvgTimetableOn from '@/lib/components/Icons/SvgTimetableOn';
import { Title01 } from '@/lib/components/Text';
import { ApiError } from '@/lib/dto/error';
import { useInterval } from '@/lib/hooks/useInterval';
import { useRerender } from '@/lib/hooks/useRerender';
import { SECOND } from '@/lib/util/time';

import { MailVerifyCodeInput } from './MailVerifyCodeInput';
import { MailVerifyEmailInput } from './MailVerifyEmailInput';
import { MailVerifyHeader } from './MailVerifyHeader';
import { MailVerifyWarning } from './MailVerifyWarning';

export const MailVerifyImpl = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const [isVerificationNumberRequested, setIsVerificationNumberRequested] = useState(false);
  const [timeoutDeadline, setTimeoutDeadline] = useState<number | null>(null);
  const [verificationState, setVerificationState] = useState(MailVerificationState.NONE);

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
      setTimeoutDeadline(Date.now() + 180 * SECOND);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const errcode = (e as AxiosError<ApiError>).response?.data.errcode;
        if (errcode === 36864) setVerificationState(MailVerificationState.ALREADY_VERIFIED);
        if (errcode === 36865) setVerificationState(MailVerificationState.VERFIED_FROM_OTHER_MAIL);
        if (errcode === 40960) setVerificationState(MailVerificationState.TOO_MANY_REQUEST);
      }
      setVerificationState(MailVerificationState.TIMEOUT);
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

        <MailVerifyWarning state={verificationState} />

        <CompleteButton onClick={onVerify} disabled={verificationState !== MailVerificationState.READY}>
          <Title01 style={{ color: 'white' }}>완료</Title01>
        </CompleteButton>
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
`;
