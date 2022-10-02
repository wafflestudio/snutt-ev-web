import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

import SvgTooltip from '@/lib/components/Icons/SvgTooltip';

import { TootTipContent } from './ToolTipContent';

export const RatingTooltip = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClickOutsideButton = (e: Event) => {
    e.preventDefault();
    if (buttonRef.current && buttonRef.current.contains(e.target as Node) === false) {
      setTooltipOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', onClickOutsideButton);

    return () => {
      document.removeEventListener('click', onClickOutsideButton);
    };
  }, []);

  return (
    <Wrapper>
      <TooltipButton onClick={() => setTooltipOpen(!tooltipOpen)} ref={buttonRef}>
        <SvgTooltip width={30} height={30} />
      </TooltipButton>
      {tooltipOpen && <TootTipContent />}
    </Wrapper>
  );
};

const TooltipButton = styled.button`
  border: none;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 0;
`;

const Wrapper = styled.div`
  position: relative;
`;
