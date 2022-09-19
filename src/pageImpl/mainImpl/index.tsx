import styled from '@emotion/styled';
import { ToggleButton, ToggleButtonGroup } from '@mui/material/';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { AppBar } from '@/lib/components/Appbar';
import SvgSearchOff from '@/lib/components/Icons/SvgSearchOff';
import SvgTimetableOn from '@/lib/components/Icons/SvgTimetableOn';
import { EmptyReviewPlaceholder } from '@/lib/components/Miscellaneous/EmptyReviewPlaceholder';
import { SearchResultLoading } from '@/lib/components/Miscellaneous/Loading';
import { Subheading02, Title01 } from '@/lib/components/Text';
import { TagDTO } from '@/lib/dto/core/tag';
import useScrollLoader from '@/lib/hooks/useScrollLoader';

import { EvaluationCard } from './__components__/EvaluationCard';
import { RecentCarousel } from './__components__/RecentCarousel';
import {
  useMainEvaluationContainer,
  useMainLatestLectureContainer,
  useRecommendationTagsContainer,
} from './__containers__';

export const MainImpl = () => {
  const router = useRouter();

  const [selectedTag, setSelectedTag] = useState<TagDTO | undefined>(undefined);
  const { recommendationTags } = useRecommendationTagsContainer();
  const { recentLectureData } = useMainLatestLectureContainer();
  const { searchResult, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useMainEvaluationContainer(selectedTag);
  const { loaderRef } = useScrollLoader(fetchNextPage);

  useEffect(() => {
    setSelectedTag(recommendationTags[0]);
  }, [recommendationTags]);

  const handleClickRecommendationTag = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    tag?: TagDTO,
  ) => {
    e.preventDefault();
    if (tag) {
      setSelectedTag(tag);
    }
  };

  return (
    <Wrapper>
      <AppBar LeftImage={() => <SvgTimetableOn height={30} width={30} />}>
        <AppBarContent>
          <Title01 style={{ marginLeft: 12 }}>강의평</Title01>
          <SvgSearchOff
            data-testid="main-search-icon"
            height={30}
            width={30}
            onClick={() => router.push('/search')}
          />
        </AppBarContent>
      </AppBar>

      {recentLectureData ? (
        recentLectureData.length === 0 ? null : (
          <RecentCarousel lectureList={recentLectureData} />
        )
      ) : (
        <Subheading02>데이터 로딩 OR 에러</Subheading02>
      )}

      <CategoryPicker data-testid="main-category-picker">
        <Title01 style={{ marginBottom: 10 }}>교양 강의평 둘러보기</Title01>
        <StyledToggleButtonGroup
          value={selectedTag}
          exclusive
          onChange={handleClickRecommendationTag}
        >
          {recommendationTags.map((it) => (
            <ToggleButton
              value={it}
              key={it.id}
              style={{ whiteSpace: 'nowrap', marginTop: '6px' }}
            >
              {it.name}
            </ToggleButton>
          ))}
        </StyledToggleButtonGroup>
        <CategoryDetail>{selectedTag?.description}</CategoryDetail>
      </CategoryPicker>

      {searchResult?.pages ? (
        searchResult?.pages[0].content.length === 0 ? (
          <EmptyReviewPlaceholder />
        ) : (
          <React.Fragment>
            {searchResult?.pages?.map((content, i) => (
              <React.Fragment key={i}>
                {content.content.map((it) => (
                  <EvaluationCard evaluation={it} key={it.id} />
                ))}
              </React.Fragment>
            ))}
            {hasNextPage && !isFetchingNextPage && <div ref={loaderRef} />}
            {isFetchingNextPage && <SearchResultLoading />}
          </React.Fragment>
        )
      ) : (
        <SearchResultLoading />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const AppBarContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 12px;
`;

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
