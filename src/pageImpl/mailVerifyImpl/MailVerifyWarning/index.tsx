import styled from '@emotion/styled';

import { Detail } from '@/components/atoms/Typography';
import { COLORS } from '@/styles/colors';

type Props = { message: string | null };

export const MailVerifyWarning = ({ message }: Props) => {
  return (
    <WarningText>
      <Detail style={{ color: COLORS.red }} data-testid="verify-warning-text">
        {message}
      </Detail>
    </WarningText>
  );
};

const WarningText = styled.div`
  height: 15px;
`;
