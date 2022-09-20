import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import {
  fetchLatestLectures,
  getMainTagEvaluations,
  getMainTagInfos,
} from '@/lib/api/apis';

export function useRecommendationTagsContainer() {
  const { data } = useQuery(['mainTags'], getMainTagInfos);
  return { recommendationTags: data?.tags ?? [] };
}

export function useMainEvaluationContainer(selectedTagId?: number) {
  const {
    data: searchResult,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['tagEvaluations', selectedTagId],
    ({ pageParam }) =>
      getMainTagEvaluations(selectedTagId ?? 1, {
        cursor: pageParam,
      }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.cursor ?? undefined;
      },
      enabled: selectedTagId !== undefined,
      suspense: false,
      retryDelay: 2000,
      retry: 5,
    },
  );

  return {
    searchResult,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
}

export function useMainLatestLectureContainer() {
  const querySearch = useQuery(['latestLectures'], fetchLatestLectures);

  const { data, error } = querySearch;

  return {
    recentLectureData: data?.content,
    totalCount: data?.total_count,
    error,
  };
}
