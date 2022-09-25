import styled from '@emotion/styled';
import { ToggleButton, ToggleButtonGroup } from '@mui/material/';
import { Fragment } from 'react';

import { EmptyReviewPlaceholder } from '@/lib/components/Miscellaneous/EmptyReviewPlaceholder';
import { SearchResultLoading } from '@/lib/components/Miscellaneous/Loading';
import { Subheading02, Title01 } from '@/lib/components/Text';
import useScrollLoader from '@/lib/hooks/useScrollLoader';

import { EvaluationCard, MainAppBar, RecentCarousel } from './__components__';
import {
  useEvaluations,
  useLatestLectures,
  useRecommendationTags,
  useSelectTag,
} from './__containers__';

export const MainImpl = () => {
  const { recommendationTags } = useRecommendationTags();
  const { recentLectureData } = useLatestLectures();

  const { selectedTagId, onClickTag } = useSelectTag(recommendationTags);

  const { searchResult, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useEvaluations(selectedTagId);

  const { loaderRef } = useScrollLoader(fetchNextPage);

  const selectedTag = recommendationTags.find(
    (tag) => tag.id === selectedTagId,
  );

  return (
    <Wrapper>
      <MainAppBar />

      {recentLectureData && recentLectureData.length > 0 && (
        <RecentCarousel lectureList={recentLectureData} />
      )}

      <CategoryPicker data-testid="main-category-picker">
        <Title01 style={{ marginBottom: 10 }}>교양 강의평 둘러보기</Title01>
        <StyledToggleButtonGroup
          value={selectedTagId}
          exclusive
          onChange={(e, tagId) => {
            if (tagId === null) return;
            onClickTag(tagId);
          }}
        >
          {recommendationTags.map(({ id, name }) => (
            <ToggleButton
              value={id}
              key={id}
              style={{ whiteSpace: 'nowrap', marginTop: '6px' }}
              data-testid="main-category-toggle-chip"
              aria-selected={id === selectedTagId}
            >
              {name}
            </ToggleButton>
          ))}
        </StyledToggleButtonGroup>
        <CategoryDetail data-testid="main-category-detail">
          {selectedTag?.description}
        </CategoryDetail>
      </CategoryPicker>

      {searchResult?.pages ? (
        searchResult?.pages[0].content.length === 0 ? (
          <EmptyReviewPlaceholder data-testid="main-empty-review" />
        ) : (
          <>
            {searchResult?.pages?.map((content, i) => (
              <Fragment key={i}>
                {content.content.map((it) => (
                  <EvaluationCard evaluation={it} key={it.id} />
                ))}
              </Fragment>
            ))}
            {hasNextPage && !isFetchingNextPage && <div ref={loaderRef} />}
            {isFetchingNextPage && <SearchResultLoading />}
          </>
        )
      ) : (
        <SearchResultLoading />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const CategoryPicker = styled.div`
  padding: 20px 20px 0 20px;
  position: sticky;
  top: 45px;
  background-color: white;
  z-index: 50;
`;

const CategoryDetail = styled(Subheading02)`
  margin-top: 10px;
  padding-bottom: 10px;
  color: rgb(119, 119, 119);
`;
const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  flex-wrap: wrap;

  & .MuiToggleButtonGroup-grouped {
    margin-right: 10px;
    border: 0;
    &.Mui-disabled {
      border: 1px solid #777777;
      height: 30px;
    }
    &.Mui-selected {
      border: 1px solid #777777;
      background-color: rgb(119, 119, 119, 1);
      color: #ffffff;
    }
    &:not(:first-of-type) {
      border: 1px solid #777777;
      border-radius: 15px;
      height: 30px;
    }
    &:first-of-type {
      border: 1px solid #777777;
      border-radius: 15px;
      height: 30px;
    }
    &.Mui-selected:hover {
      border: 1px solid #777777;
      background-color: #777777;
      color: #ffffff;
    }
  }
`;
