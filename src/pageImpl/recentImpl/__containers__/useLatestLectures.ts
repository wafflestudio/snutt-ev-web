import { useQuery } from '@tanstack/react-query';

import { fetchLatestLectures } from '@/lib/apis/ev';
import { GetLatestLecturesResult } from '@/lib/apis/ev/types';
import { formatLatestLectureToYearSemester } from '@/lib/util/formatLatestLectureToYearSemester';

const select = (data: GetLatestLecturesResult) => {
  return formatLatestLectureToYearSemester(data.content);
};

export function useLatestLectures() {
  return useQuery(['latestLectures', {}], () => fetchLatestLectures({ query: {} }), { select });
}
