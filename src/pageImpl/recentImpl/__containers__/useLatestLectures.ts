import { useQuery } from '@tanstack/react-query';

import { fetchLatestLectures } from '@/lib/api/apis';

export function useLatestLectures() {
  const querySearch = useQuery(['latestLectures'], () => fetchLatestLectures());

  const { data, error } = querySearch;

  return {
    recentLectureData: data?.content,
    totalCount: data?.total_count,
    error,
  };
}
