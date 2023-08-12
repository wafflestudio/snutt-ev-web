import styled from '@emotion/styled';

import { COLORS } from '@/styles/colors';

export const MailVerifyGuide = () => {
  return (
    <GuideText>
      <GuideTitle>“이미 사용된 메일입니다”라는 문구가 떴나요?</GuideTitle>
      <GuideDetail>
        다른 계정에서 동일한 메일 주소를 이용하여 이메일 인증을 완료한 경우입니다. 현재 계정에서 로그아웃 후{' '}
        <GuideDetailBold>[로그인 &gt; 아이디 찾기]</GuideDetailBold>를 통해 해당 계정을 찾을 수 있습니다.
      </GuideDetail>
      <GuideDetail>
        위 방법으로 계정을 찾기 어려운 경우 <GuideDetailBold>마이스누 메일</GuideDetailBold>을 이용하여{' '}
        <GuideDetailBold>snutt@wafflestudio.com</GuideDetailBold>로 메일을 보내주시면 계정을 찾는 데 도움을
        드리겠습니다.
      </GuideDetail>
    </GuideText>
  );
};

const GuideText = styled.div`
  margin-top: 36px;
  font-family: Apple SD Gothic Neo;
  font-size: 12px;
  text-align: left;
  color: ${COLORS.darkGray};
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
