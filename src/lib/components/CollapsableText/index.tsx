import styled from '@emotion/styled';
import { useState } from 'react';

import { Detail } from '@/lib/components/Text';

interface Props {
  text: string;
  truncBy?: number;
}

export const CollapsableText = ({ text, truncBy = 120 }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const renderedText =
    text.length > truncBy && !expanded ? text.slice(0, truncBy) + '...' : text;

  const onClickMoreLess = () => setExpanded((status) => !status);

  return (
    <Detail
      style={{ overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}
      data-testid="collapsable-text-content"
    >
      {renderedText}
      {text.length > truncBy && (
        <MoreLessButton
          onClick={onClickMoreLess}
          data-testid="collapsable-text-moreless-btn"
        >
          {expanded ? ' 접기' : ' 더보기'}
        </MoreLessButton>
      )}
    </Detail>
  );
};

const MoreLessButton = styled.span`
  color: rgb(179, 179, 179);
  cursor: pointer;
`;
