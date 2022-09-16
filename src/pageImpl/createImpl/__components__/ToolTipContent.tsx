import styled from "@emotion/styled";

import { Title01, Title02 } from "@/lib/components/Text";

export const TootTipContent = () => {
  return (
    <>
      <Wrapper>
        <Title01>성적만족도</Title01>
        <Title02 style={{ marginBottom: 10 }}>
          이번 강의 성적에 만족하셨나요?
        </Title02>
        <Title01>강의력</Title01>
        <Title02 style={{ marginBottom: 10 }}>
          교수님의 강의력은 좋았나요?
        </Title02>
        <Title01>수라밸</Title01>
        <Title02 style={{ marginBottom: 10 }}>
          수업과 라이프의 밸런스는 맞았나요?
        </Title02>
        <Title01>얻어가는 것</Title01>
        <Title02>강의를 통해 배움을 얻으셨나요?</Title02>
      </Wrapper>
      <WrapperTriangle />
      <WrapperTriangleBorder />
    </>
  );
};

const Wrapper = styled.div`
  & {
    position: absolute;
    background: #f2f2f2;
    border: 1px solid #c4c4c4;
    padding: 14px;
    width: 248px;
    right: 0;
    top: 48px;
    border-radius: 6px;
    z-index: 10;
  }
`;

const WrapperTriangle = styled.div`
  right: 3px;
  content: "";
  border-right: 11px solid transparent;
  border-left: 11px solid transparent;
  border-bottom: 24px solid #f2f2f2;
  position: absolute;
  z-index: 100;
`;

const WrapperTriangleBorder = styled.div`
  right: 1px;
  margin-top: -1px;
  content: "";
  border-right: 13px solid transparent;
  border-left: 13px solid transparent;
  border-bottom: 26px solid #c4c4c4;
  position: absolute;
  z-index: -10;
`;
