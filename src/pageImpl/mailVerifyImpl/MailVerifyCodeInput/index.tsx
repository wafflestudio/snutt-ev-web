import styled from '@emotion/styled';
import CountDown, { CountdownRenderProps, zeroPad } from 'react-countdown';

import { Subheading01 } from '@/lib/components/Text';
import { COLORS } from '@/lib/styles/colors';

import { MailVerificationState } from '..';

type Props = {
  code: string;
  onChangeCode: (code: string) => void;

  verificationState: MailVerificationState;
  setVerificationState: (state: MailVerificationState) => void;

  timeoutDeadline: number;
  isVerificationNumberRequested: boolean;
};

export const MailVerifyCodeInput = ({
  code,
  onChangeCode,
  timeoutDeadline,
  verificationState,
  setVerificationState,
  isVerificationNumberRequested,
}: Props) => {
  return (
    <VerificationNumberInputWrapper>
      <Subheading01>인증번호</Subheading01>
      <VerificationNumberInputBar>
        <TransparentInput
          type="number"
          value={code}
          placeholder="인증번호 6자리를 입력하세요"
          onChange={(e) => onChangeCode(e.target.value)}
        />
        {isVerificationNumberRequested && (
          <CountDownWrapper>
            <CountDown
              date={timeoutDeadline}
              onTick={({ completed }) => {
                if (!completed && verificationState === MailVerificationState.TIMEOUT)
                  setVerificationState(MailVerificationState.READY);
              }}
              onComplete={() => setVerificationState(MailVerificationState.TIMEOUT)}
              renderer={({ minutes, seconds, completed }: CountdownRenderProps) => (
                <Subheading01 style={{ color: COLORS.red }}>
                  {completed ? '00:00' : `${zeroPad(minutes)}:${zeroPad(seconds)}`}
                </Subheading01>
              )}
            />
          </CountDownWrapper>
        )}
      </VerificationNumberInputBar>
    </VerificationNumberInputWrapper>
  );
};

const TransparentInput = styled.input`
  border: none;
  flex-grow: 1;
  line-height: 15px;
  padding-left: 0;
  background-color: transparent;

  font-family: AppleSDGothicNeo;
  font-weight: normal;
  font-size: 14px;
  line-height: 15px;

  color: ${({ theme }) => theme.colors.text.form};

  ::placeholder {
    color: #c4c4c4;
  }
`;

const VerificationNumberInputWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  position: relative;
`;

const VerificationNumberInputBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 34px;
  width: 100%;
  border-bottom: solid 1px #c4c4c4;
`;

const CountDownWrapper = styled.div`
  width: 56px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
