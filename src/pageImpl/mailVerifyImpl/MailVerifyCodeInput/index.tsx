import styled from '@emotion/styled';

import { Subheading01 } from '@/components/atoms/Typography';
import { COLORS } from '@/styles/colors';
import { toMinuteSecondFormat } from '@/utils/time';
import { Lang, strings } from '../locale';

type Props = {
  code: string;
  onChangeCode: (code: string) => void;

  timeoutDeadline: number | null;
  isVerificationNumberRequested: boolean;

  lang: Lang;
};

export const MailVerifyCodeInput = ({ code, onChangeCode, timeoutDeadline, isVerificationNumberRequested, lang }: Props) => {
  const s = strings[lang];
  return (
    <VerificationNumberInputWrapper>
      <Subheading01>{s.codeLabel}</Subheading01>
      <VerificationNumberInputBar>
        <TransparentInput
          data-testid="verify-code-input"
          type="number"
          value={code}
          placeholder={s.codePlaceholder}
          onChange={(e) => onChangeCode(e.target.value)}
        />
        {isVerificationNumberRequested && timeoutDeadline && (
          <CountDownWrapper>
            <Subheading01 style={{ color: COLORS.red }}>
              {toMinuteSecondFormat(timeoutDeadline - Date.now())}
            </Subheading01>
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
