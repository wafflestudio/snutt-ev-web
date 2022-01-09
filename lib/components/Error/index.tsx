import errorCat from "public/images/img-waffle-cat.png"
import styled from "@emotion/styled"
import { Title02 } from "@lib/components/Text/Title"
import Image from "next/image"

interface Props {
  resetErrorBoundary?: (...args: Array<unknown>) => void
}

export const ErrorView = ({ resetErrorBoundary }: Props) => {
  return (
    <Container>
      <Title02>에러가 발생했습니다.</Title02>
      {/* <Image src={errorCat} alt="error" width="168" height="176" /> */}
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
