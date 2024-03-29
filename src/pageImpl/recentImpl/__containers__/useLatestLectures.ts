import { useQuery } from '@tanstack/react-query';

import { fetchLatestLectures } from '@/apis/ev';
import { GetLatestLecturesResult } from '@/apis/ev/types';
import { formatLatestLectureToYearSemester } from '@/utils/formatLatestLectureToYearSemester';

const select = (data: GetLatestLecturesResult) => {
  return formatLatestLectureToYearSemester(data.content);
};

export function useLatestLectures() {
  return useQuery(['latestLectures', {}], () => fetchLatestLectures({ query: {} }), { select });
}
