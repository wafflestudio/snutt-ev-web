import styled from "@emotion/styled"
import { Searchbar } from "./__components__/Searchbar"
import { SearchResultItem } from "./__components__/SearchResultItem"
import React, { useState } from "react"
import { SearchOptionSheet } from "./__components__/SearchOptionSheet"
import { useTagContainer } from "./__containers__/useTagContainer"
import { ActiveTagList } from "./__components__/SelectedTagList"
import useScrollLoader from "@/lib/hooks/useScrollLoader"
import useSearchOptionContainer from "./__containers__/useSearchOptionContainer"
import { SearchNoResult } from "./__components__/SearchNoResult"
import { SearchInitialPage } from "./__components__/SearchInitialPage"
import { SearchResultLoading } from "@/lib/components/Miscellaneous/Loading"

export const SearchImpl = () => {
  const {
    tagGroups,
    selectedTags,
    toggleTagSelection,
    currentlyAppliedQuery,
    refreshQueries,
    selectedTextQuery,
    updateTextQuery,
  } = useTagContainer()

  const { searchResult, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useSearchOptionContainer(
      currentlyAppliedQuery?.tags ?? [],
      currentlyAppliedQuery?.textQuery,
    )

  const { loaderRef } = useScrollLoader(fetchNextPage)
  const [isSearchSheetOpen, setIsSearchSheetOpen] = useState(false)

  const isEmptyQuery =
    currentlyAppliedQuery === undefined ||
    (currentlyAppliedQuery?.textQuery === "" &&
      currentlyAppliedQuery?.tags.length === 0)

  return (
    <Wrapper>
      <Searchbar
        toggleOpenSearchSheet={() => {
          setIsSearchSheetOpen((prev) => !prev)
        }}
        textQuery={selectedTextQuery}
        onChangeTextQuery={updateTextQuery}
        onRefreshQuery={refreshQueries}
      />
      <ActiveTagList
        selectedTags={selectedTags}
        onDeleteTag={toggleTagSelection}
      />
      <SearchResultList>
        {/* FIXME: skip api request if input is "" */}
        {isEmptyQuery ? (
          <SearchInitialPage />
        ) : searchResult?.pages[0].content.length !== 0 ? (
          <React.Fragment>
            {searchResult?.pages?.map((content, i) => (
              <React.Fragment key={i}>
                {content.content.map((it) => (
                  <SearchResultItem
                    content={it}
                    key={it.course_number + it.instructor}
                  />
                ))}
              </React.Fragment>
            ))}
            {hasNextPage && !isFetchingNextPage && <div ref={loaderRef} />}
            {isFetchingNextPage && <SearchResultLoading />}
          </React.Fragment>
        ) : (
          <SearchNoResult />
        )}
      </SearchResultList>
      <SearchOptionSheet
        selectedTags={selectedTags || []}
        tagGroups={tagGroups || []}
        onToggleTag={toggleTagSelection}
        isOpened={isSearchSheetOpen}
        onClose={() => setIsSearchSheetOpen(false)}
        onClickSubmit={() => {
          refreshQueries()
          setIsSearchSheetOpen(false)
        }}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div``

const SearchResultList = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`
