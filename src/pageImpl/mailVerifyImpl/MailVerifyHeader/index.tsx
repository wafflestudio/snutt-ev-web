import styled from '@emotion/styled';

import { Title01 } from '@/components/atoms/Typography';

import { Lang, strings } from '../locale';

export const MailVerifyHeader = ({ lang }: { lang: Lang }) => {
  const s = strings[lang];
  return (
    <DescriptionTextWrapper data-testid="verify-header">
      <div>
        <Title01>{s.headerLine1}</Title01>
        <Title01>{s.headerLine2}</Title01>
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
