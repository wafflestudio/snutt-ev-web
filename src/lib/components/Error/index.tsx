import styled from "@emotion/styled";

import ReviewIcon from "@/assets/icons/review_icon.svg";
import SurprisedCatImage from "@/assets/icons/surprised_cat.svg";
import { Title02 } from "@/lib/components/Text/Title";

interface Props {
  resetErrorBoundary?: (...args: Array<unknown>) => void;
}

export const ErrorView = ({}: Props) => {
  return (
    <Container>
      <SurprisedCatImage />
      <br />
      <Title02>에러가 발생했어요</Title02>
      <Row>
        <ReviewIcon />
        <Title02 style={{ marginTop: "8px", marginLeft: "6px" }}>
          하단의 강의평 탭을 다시 눌러주세요
        </Title02>
      </Row>

      {/*{resetErrorBoundary &&*/}
      {/*  <button onClick={() => resetErrorBoundary()}>다시 불러오기</button>*/}
      {/*  }*/}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Row = styled.div`
  display: inline-flex;
`;
