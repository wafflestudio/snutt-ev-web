import styled from '@emotion/styled';

import { Title01 } from '@/components/atoms/Typography';

export const MailVerifyHeader = () => {
  return (
    <DescriptionTextWrapper data-testid="verify-header">
      <div>
        <Title01>강의평 서비스 이용을 위해</Title01>
        <Title01>이메일 인증이 필요합니다.</Title01>
      </div>
    </DescriptionTextWrapper>
  );
};

const DescriptionTextWrapper = styled.div`
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
