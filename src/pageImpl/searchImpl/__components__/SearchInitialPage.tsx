import styled from "@emotion/styled"
import React from "react"

import { Title01, Title02 } from "@/lib/components/Text"
import SvgSearchBig from "@/public/icons/img_search_big.svg"

export const SearchInitialPage = () => {
  return (
    <Wrapper>
      <SvgSearchBig />
      <Title style={{ marginTop: 25 }}>SNUTT 검색 꿀팁 &#127855;</Title>
      <Subtitle style={{ marginTop: 34 }}>
        다양한 조합으로 검색해보세요.
      </Subtitle>
      <ContentText>ex) 2학년 컴공 전필</ContentText>
      <br />
      <Subtitle>줄임말로 검색해보세요.</Subtitle>
      <ContentText>ex) 죽음의 과학적 이해 유성호 → 죽과이 유성호</ContentText>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
`

const Title = styled(Title01)`
  font-size: 25px;
  color: rgba(119, 119, 119, 0.7);
`

const Subtitle = styled(Title01)`
  font-size: 17px;
  color: rgba(119, 119, 119, 0.7);
  line-height: 25px;
`

const ContentText = styled(Title02)`
  font-size: 17px;
  color: rgba(119, 119, 119, 0.7);
  line-height: 25px;
`
