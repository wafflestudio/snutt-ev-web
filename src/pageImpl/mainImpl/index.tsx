import styled from '@emotion/styled';
import Link from 'next/link';
import { Fragment } from 'react';

import { Chip } from '@/components/atoms/Chip';
import SvgChevron from '@/components/atoms/Icons/SvgChevronRight';
import { Subheading02, Title01 } from '@/components/atoms/Typography';
import { LoadingIndicator } from '@/components/molecules/LoadingIndicator';
import { EmptyReviewPlaceholder } from '@/components/templates/EmptyReviewPlaceholder';
import useScrollLoader from '@/hooks/useScrollLoader';

import { EvaluationCard, MainAppBar, RecentCarousel } from './__components__';
import { useSelectTag } from './__containers__';
import { useEvaluations, useLatestLectures, useMainTags } from './__queries__';

export const MainImpl = () => {
  const { data: mainTags } = useMainTags();
  const { data: latestLectures } = useLatestLectures();

  const recommendationTags = mainTags?.tags ?? [];

  const { selectedTagId, onClickTag } = useSelectTag(recommendationTags);

  const { data: searchResult, fetchNextPage, isFetchingNextPage, hasNextPage } = useEvaluations(selectedTagId);

  const { loaderRef } = useScrollLoader(fetchNextPage);

  const recentLectureData = latestLectures?.content;
  const selectedTag = recommendationTags.find((tag) => tag.id === selectedTagId);

  return (
    <Wrapper>
      <MainAppBar />

      {recentLectureData && recentLectureData.length > 0 && <RecentCarousel lectureList={recentLectureData} />}

      <CategoryPicker data-testid="main-category-picker">
        <CategoryPickerTitleWrapper>
          <CategoryPickerTitle>강의평 둘러보기</CategoryPickerTitle>
          <CategoryPickerLink href={'/me/evaluations'} draggable="false">
            <CategoryPickerText data-testid="main-my-evaluations-link">
              내가 남긴 강의평 <SvgChevron />
            </CategoryPickerText>
          </CategoryPickerLink>
        </CategoryPickerTitleWrapper>
        <ChipsWrapper>
          {recommendationTags.map(({ id, name }) => {
            const isSelected = id === selectedTagId;

            return (
              <ToggleChip
                value={id}
                key={id}
                data-testid="main-category-toggle-chip"
                selected={isSelected}
                aria-selected={isSelected}
                onClick={() => onClickTag(id)}
              >
                {name}
              </ToggleChip>
            );
          })}
        </ChipsWrapper>
        <CategoryDetail data-testid="main-category-detail">{selectedTag?.description}</CategoryDetail>
      </CategoryPicker>

      {searchResult?.pages ? (
        searchResult?.pages[0].content.length === 0 ? (
          <EmptyReviewPlaceholder data-testid="main-empty-review" />
        ) : (
          <>
            {searchResult?.pages?.map((content, i) => (
              <Fragment key={i}>
                {content.content.map((it) => (
                  <EvaluationCard evaluation={it} key={it.id} selectedTagId={selectedTagId} />
                ))}
              </Fragment>
            ))}
            {hasNextPage && !isFetchingNextPage && <div ref={loaderRef} />}
            {isFetchingNextPage && <LoadingIndicator />}
          </>
        )
      ) : (
        <LoadingIndicator />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const CategoryPicker = styled.div`
  padding: 20px 20px 0 20px;
  position: sticky;
  top: 45px;
  background-color: ${({ theme }) => theme.colors.bg.default};
  z-index: 50;
`;

const CategoryDetail = styled(Subheading02)`
  margin-top: 10px;
  padding-bottom: 10px;
  color: ${({ theme }) => theme.colors.text.desc};
`;

const ChipsWrapper = styled.div`
  padding-top: 6px;
`;

const ToggleChip = styled(Chip)`
  &:not(:first-of-type) {
    margin-left: 10px;
  }
`;

const CategoryPickerTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;

const CategoryPickerTitle = styled(Title01)`
  margin: 0;
`;

const CategoryPickerLink = styled(Link)`
  text-decoration: none;
`;

const CategoryPickerText = styled(Subheading02)`
  color: #777777;
`;
