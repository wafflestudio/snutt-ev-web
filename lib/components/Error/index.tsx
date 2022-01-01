import errorCat from "public/images/img-waffle-cat.png"
import Image from "next/image"
import styled from "@emotion/styled"

interface Props {
  resetErrorBoundary?: (...args: Array<unknown>) => void
}

export const ErrorView = ({ resetErrorBoundary }: Props) => {
  return (
    <Container>
      <Text>에러가 발생했습니다.</Text>
      <Image src={errorCat} alt="error" width="168" height="176" />
      {resetErrorBoundary &&
        // <button onClick={() => resetErrorBoundary()}>다시 불러오기</button>
        null}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Text = styled.p`
  font-family: AppleSDGothicNeo;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 20.5px;
`
