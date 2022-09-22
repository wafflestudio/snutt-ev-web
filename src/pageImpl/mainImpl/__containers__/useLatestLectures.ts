import { useQuery } from '@tanstack/react-query';

import { fetchLatestLectures } from '@/lib/api/apis';

export function useLatestLectures() {
  const { data, error } = useQuery(['latestLectures'], () =>
    fetchLatestLectures(),
  );

  return {
    recentLectureData: data?.content,
    totalCount: data?.total_count,
    error,
  };
}
