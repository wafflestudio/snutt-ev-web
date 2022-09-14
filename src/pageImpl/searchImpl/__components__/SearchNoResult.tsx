import styled from "@emotion/styled"
import React from "react"

import { Title02 } from "@/lib/components/Text"
import SvgSearchBig from "@/public/icons/img_search_big.svg"

export const SearchNoResult = () => {
  return (
    <Wrapper>
      <SvgSearchBig />
      <Text style={{ marginTop: 40 }}>검색 결과가 없습니다.</Text>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
  margin-top: 25vh;
`

const Text = styled(Title02)`
  color: rgba(119, 119, 119, 0.7);
`
