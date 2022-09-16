import styled from '@emotion/styled';
import React, { useState } from 'react';

import { Detail } from '@/lib/components/Text';

interface Props {
  text: string;
  truncBy?: number;
}

export const CollapsableText: React.FC<Props> = ({ text, truncBy = 120 }) => {
  const [expanded, setExpanded] = useState(false);

  const renderedText =
    text.length > truncBy && !expanded ? text.slice(0, truncBy) + '...' : text;

  return (
    <Detail style={{ overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
      {renderedText}
      {text.length > truncBy && (
        <MoreLessButton onClick={() => setExpanded((status) => !status)}>
          {' '}
          {expanded ? '접기' : '더보기'}
        </MoreLessButton>
      )}
    </Detail>
  );
};

const MoreLessButton = styled.a`
  color: rgb(179, 179, 179);
`;
