import styled from '@emotion/styled';
import { MouseEvent, useState } from 'react';

import { Detail } from '@/components/atoms/Typography';

interface Props {
  text: string;
  truncBy?: number;
  onClickMoreLess?: (e: MouseEvent) => void;
}

export const CollapsableText = ({ text, truncBy = 120, onClickMoreLess }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const renderedText = text.length > truncBy && !expanded ? text.slice(0, truncBy) + '...' : text;

  const handleClickMoreLess = () => setExpanded((status) => !status);

  return (
    <Detail style={{ overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }} data-testid="collapsable-text-content">
      {renderedText}
      {text.length > truncBy && (
        <MoreLessButton
          onClick={(e) => {
            onClickMoreLess?.(e);
            handleClickMoreLess();
          }}
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
