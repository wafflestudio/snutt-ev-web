import styled from '@emotion/styled';

import { Subheading01, Subheading02 } from '@/lib/components/Text';

type Props = {
  email: string;
  onChangeEmail: (email: string) => void;

  hasRequested: boolean;
  onRequest: () => void;
};

export const MailVerifyEmailInput = ({ email, onChangeEmail, onRequest, hasRequested }: Props) => {
  return (
    <EmailInputWrapper>
      <Subheading01>이메일</Subheading01>
      <EmailInputBar>
        <TransparentInput
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => onChangeEmail(e.target.value)}
        />
        <MailAddress>
          <Subheading02>@snu.ac.kr</Subheading02>
        </MailAddress>
        <RequestVerificationButton onClick={onRequest} disabled={email === ''}>
          {hasRequested ? '다시 요청' : '인증요청'}
        </RequestVerificationButton>
      </EmailInputBar>
    </EmailInputWrapper>
  );
};

const EmailInputWrapper = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;

const EmailInputBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  height: 34px;
  width: 100%;
  border-bottom: solid 1px #c4c4c4;
`;

const MailAddress = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 2px 0 2px;
`;

const RequestVerificationButton = styled.button`
  width: 85px;
  height: 100%;
  background-color: transparent;
  border: none;

  font-family: AppleSDGothicNeo;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: ${({ theme }) => theme.colors.button.secondary.default.text};

  &:disabled {
    color: ${({ theme }) => theme.colors.button.secondary.disabled.text};
  }
`;

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
