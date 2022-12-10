import styled from '@emotion/styled';
import { Fragment, useMemo, useState } from 'react';

import { LoadingIndicator } from '@/components/molecules/LoadingIndicator';
import useScrollLoader from '@/hooks/useScrollLoader';

import {
  ActiveTagList,
  Searchbar,
  SearchInitialPage,
  SearchNoResult,
  SearchOptionSheet,
  SearchResultItem,
} from './__components__';
import { useSearchOptions } from './__containers__';
import { useSearchResult, useSearchTags } from './__queries__';

export const SearchImpl = () => {
  const {
    selectedTagIDs,
    toggleTagSelection,
    currentlyAppliedQuery,
    refreshQueries,
    selectedTextQuery,
    updateTextQuery,
  } = useSearchOptions();

  const { data: tagGroups } = useSearchTags();
  const {
    data: searchResult,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useSearchResult(currentlyAppliedQuery?.tags ?? [], currentlyAppliedQuery?.textQuery);

  const { loaderRef } = useScrollLoader(fetchNextPage);

  const [isSearchSheetOpen, setIsSearchSheetOpen] = useState(false);

  const isEmptyQuery =
    currentlyAppliedQuery === undefined ||
    (currentlyAppliedQuery?.textQuery === '' && currentlyAppliedQuery?.tags.length === 0);

  const selectedTags = useMemo(
    () => tagGroups?.flatMap((group) => group.tags).filter((tag) => selectedTagIDs.includes(tag.id)),
    [selectedTagIDs, tagGroups],
  );

  return (
    <Wrapper>
      <Searchbar
        toggleOpenSearchSheet={() => {
          setIsSearchSheetOpen((prev) => !prev);
        }}
        textQuery={selectedTextQuery}
        onChangeTextQuery={updateTextQuery}
        onRefreshQuery={refreshQueries}
      />
      <ActiveTagList selectedTags={selectedTags} onDeleteTag={toggleTagSelection} />
      <SearchResultList>
        {isEmptyQuery ? (
          <SearchInitialPage />
        ) : searchResult?.pages[0].content.length !== 0 ? (
          <>
            {searchResult?.pages?.map((content, i) => (
              <Fragment key={i}>
                {content.content.map((it) => (
                  <SearchResultItem content={it} key={it.course_number + it.instructor} />
                ))}
              </Fragment>
            ))}
            {hasNextPage && !isFetchingNextPage && <div ref={loaderRef} />}
            {isFetchingNextPage && <LoadingIndicator />}
          </>
        ) : (
          <SearchNoResult />
        )}
      </SearchResultList>
      <SearchOptionSheet
        selectedTags={selectedTags ?? []}
        tagGroups={tagGroups ?? []}
        onToggleTag={toggleTagSelection}
        isOpened={isSearchSheetOpen}
        onClose={() => setIsSearchSheetOpen(false)}
        onClickSubmit={() => {
          refreshQueries();
          setIsSearchSheetOpen(false);
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const SearchResultList = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`;
