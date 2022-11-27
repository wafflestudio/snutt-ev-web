import styled from '@emotion/styled';
import { Fragment, useEffect, useRef, useState } from 'react';

import SvgTooltip from '@/lib/components/atoms/Icons/SvgTooltip';
import { Title01, Title02 } from '@/lib/components/atoms/Typography';

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
      {tooltipOpen && (
        <ContentWrapper>
          {contents.map(({ title, content }) => (
            <Fragment key={title}>
              <Title01>{title}</Title01>
              <Content>{content}</Content>
            </Fragment>
          ))}
        </ContentWrapper>
      )}
    </Wrapper>
  );
};

const contents = [
  { title: '성적만족도', content: '이번 강의 성적에 만족하셨나요?' },
  { title: '강의력', content: '교수님의 강의력은 좋았나요?' },
  { title: '수라밸', content: '수업과 라이프의 밸런스는 맞았나요?' },
  { title: '얻어가는 것', content: '강의를 통해 배움을 얻으셨나요?' },
];

const TooltipButton = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 0;
`;

const Wrapper = styled.div`
  position: relative;
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 50px;
  right: 0;

  z-index: 10;

  padding: 14px;
  width: 248px;

  background-color: ${({ theme }) => theme.colors.bg.info};
  border: 1px solid ${({ theme }) => theme.colors.border.info};
  border-radius: 6px;

  &::before {
    content: '';
    right: 5px;
    border-right: 9px solid transparent;
    border-left: 9px solid transparent;
    border-bottom: 20px solid ${({ theme }) => theme.colors.bg.info};
    position: absolute;
    z-index: 11;
    top: -20px;
  }

  &::after {
    content: '';
    right: 3px;
    margin-top: -1px;
    border-right: 11px solid transparent;
    border-left: 11px solid transparent;
    border-bottom: 22px solid ${({ theme }) => theme.colors.border.info};
    position: absolute;
    top: -21px;
  }
`;

const Content = styled(Title02)`
  margin-bottom: 10px;
`;
