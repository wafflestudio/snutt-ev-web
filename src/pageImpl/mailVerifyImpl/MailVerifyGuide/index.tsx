import styled from '@emotion/styled';

import { Lang, strings } from '../locale';

export const MailVerifyGuide = ({ lang }: { lang: Lang }) => {
  const s = strings[lang];
  return (
    <GuideText>
      <GuideTitle>{s.guideTitle}</GuideTitle>
      {lang === 'en' ? (
        <>
          <GuideDetail>
            Another account has already completed email verification with the same email address. After logging out of
            the current account, you can find that account through{' '}
            <GuideDetailBold>[Login &gt; Find ID]</GuideDetailBold>.
          </GuideDetail>
          <GuideDetail>
            If you have difficulty finding the account this way, please send an email from your{' '}
            <GuideDetailBold>SNU mail</GuideDetailBold> to <GuideDetailBold>snutt@wafflestudio.com</GuideDetailBold> and
            we will help you find your account.
          </GuideDetail>
        </>
      ) : (
        <>
          <GuideDetail>
            다른 계정에서 동일한 메일 주소를 이용하여 이메일 인증을 완료한 경우입니다. 현재 계정에서 로그아웃 후{' '}
            <GuideDetailBold>[로그인 &gt; 아이디 찾기]</GuideDetailBold>를 통해 해당 계정을 찾을 수 있습니다.
          </GuideDetail>
          <GuideDetail>
            위 방법으로 계정을 찾기 어려운 경우 <GuideDetailBold>마이스누 메일</GuideDetailBold>을 이용하여{' '}
            <GuideDetailBold>snutt@wafflestudio.com</GuideDetailBold>로 메일을 보내주시면 계정을 찾는 데 도움을
            드리겠습니다.
          </GuideDetail>
        </>
      )}
    </GuideText>
  );
};

const GuideText = styled.div`
  margin-top: 36px;
  font-family: AppleSDGothicNeo;
  font-size: 12px;
  text-align: left;
  color: ${({ theme }) => theme.colors.text.caption};
  word-break: keep-all;
`;

const GuideTitle = styled.p`
  margin: 0 0 4px;
  font-weight: bold;
  line-height: 14px;
`;

const GuideDetail = styled.p`
  margin: 12px 0px;
  font-weight: normal;
`;

const GuideDetailBold = styled.span`
  font-weight: bold;
`;
