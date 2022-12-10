import { useInfiniteQuery } from '@tanstack/react-query';

import { getLectures } from '@/apis/ev';

export const useSearchResult = (selectedTagIDs: number[], textQuery?: string) => {
  return useInfiniteQuery(
    ['lectureSearch', textQuery, selectedTagIDs],
    ({ pageParam }) => getLectures({ query: { query: textQuery, tags: selectedTagIDs, page: pageParam } }),
    { getNextPageParam: (lastPage) => (lastPage.last ? undefined : (lastPage.page ?? 0) + 1) },
  );
};
