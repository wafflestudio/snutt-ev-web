import styled from "@emotion/styled"
import star_small_empty from "@public/icons/star_small_empty.svg"
import star_small_half from "@public/icons/star_small_half.svg"
import star_small_filled from "@public/icons/star_small_filled.svg"
import Image from "next/image"

interface Props {
  rating: number
  size: number
}

export const Rating = ({ rating, size }: Props) => {
  var stars = []

  for (var i = 1; i < 6; i++) {
    if (rating - i > -0.25) {
      stars.push(
        <Image
          src={star_small_filled}
          alt={"star"}
          height={size}
          width={size}
        />,
      )
    } else if (rating - i <= -0.25 && rating - i >= -0.75) {
      stars.push(
        <Image src={star_small_half} alt={"star"} height={size} width={size} />,
      )
    } else {
      stars.push(
        <Image
          src={star_small_empty}
          alt={"star"}
          height={size}
          width={size}
        />,
      )
    }
  }

  return <Wrapper>{stars}</Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`
