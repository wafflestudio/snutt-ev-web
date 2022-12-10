import { useQuery } from '@tanstack/react-query';

import { fetchLatestLectures } from '@/apis/ev';

export function useLatestLectures() {
  return useQuery(['latestLectures', { filter: 'no-my-evaluation' }], () =>
    fetchLatestLectures({ query: { filter: 'no-my-evaluations' } }),
  );
}
