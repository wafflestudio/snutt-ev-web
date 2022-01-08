import styled from "@emotion/styled"
import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"

import tab_search_off_icon from "@public/icons/search_off.svg"
import filter_icon from "@public/icons/filter.svg"
import arrow_back_icon from "@public/icons/arrow_back.svg"
import { AppBar } from "@lib/components/Appbar"

export const Searchbar = () => {
  const router = useRouter()

  return (
    <AppBar
      leftImageSrc={arrow_back_icon}
      leftImageOnClick={() => router.back()}
    >
      <InputBar>
        <SearchButton>
          <Image
            src={tab_search_off_icon}
            alt={"tab_search_icon"}
            height={43}
            width={43}
            stroke-witdh={1}
          />
        </SearchButton>
        <Input placeholder="검색어를 입력하세요" />
        <TagButton>
          <Image src={filter_icon} alt={"tag_button"} height={43} width={43} />
        </TagButton>
      </InputBar>
    </AppBar>
  )
}

const InputBar = styled.div`
  height: 36px;
  width: 100%;
  background: #f2f2f2;
  border-radius: 6px;
  border-width: 0px;
  margin: 5px 20px 5px 6px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Input = styled.input`
  font-family: AppleSDGothicNeo;
  font-weight: normal;
  font-size: 18px;

  background: #f2f2f2;
  border: 0px;
  height: 100%;
  width: 100%;

  margin-left: 8px;
  margin-right: 8px;

  padding: 0 0 0 0;
`

const SearchButton = styled.button`
  background: #f2f2f2;
  border-radius: 6px 0px 0px 6px;
  margin-left: 6px;
  padding: 0 0 0 0;
  border: 0;

  display: flex;
  align-items: center;
`

const TagButton = styled.button`
  background: #f2f2f2;
  border-radius: 0px 6px 6px 0px;
  margin-right: 6px;
  border: 0px;
  padding: 0 0 0 0;

  display: flex;
  align-items: center;
`
