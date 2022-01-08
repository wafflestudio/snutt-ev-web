import styled from "@emotion/styled"
import { Searchbar } from "./__components__/Searchbar"
import { useSearchContainer } from "./__containers__/search"
import { SearchResultItem } from "./__components__/SearchResultItem"
import { useState } from "react"
import { SearchOptionSheet } from "./__components__/SearchOptionSheet"
import { useTagContainer } from "./__containers__/filter"
import { ActiveTagList } from "./__components__/ActiveTagList"

export const SearchImpl = () => {
  const { data } = useSearchContainer()
  const {
    tagGroupWithTags,
    error,
    isLoading,
    selectedTags,
    toggleTagSelection,
  } = useTagContainer()
  const [isSearchSheetOpen, setIsSearchSheetOpen] = useState(false)

  return (
    <Wrapper>
      <Searchbar
        toggleOpenSearchSheet={() => {
          setIsSearchSheetOpen((prev) => !prev)
        }}
      />
      <ActiveTagList
        selectedTags={selectedTags}
        onDeleteTag={toggleTagSelection}
      />
      <SearchResultList>
        {data ? (
          data.map((it) => <SearchResultItem content={it} key={it.id} />)
        ) : (
          <SearchNoResult>강의명, 교수명으로 검색하세요</SearchNoResult>
        )}
      </SearchResultList>
      <SearchOptionSheet
        selectedTags={selectedTags || []}
        tagGroupsWithTags={tagGroupWithTags || []}
        toggleTagSelection={toggleTagSelection}
        isOpened={isSearchSheetOpen}
        setOpened={setIsSearchSheetOpen}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div``

const SearchResultList = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`

const SearchNoResult = styled.div`
  font-size: 16px;
  color: #777777;
`
