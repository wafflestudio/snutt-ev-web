import { useQuery } from '@tanstack/react-query';

import { fetchLatestLectures } from '@/lib/api/apis';
import { GetLatestLecturesResult } from '@/lib/dto/getLatestLectures';
import { formatLatestLectureToYearSemester } from '@/usecases/lecture/formatLatestLectureToYearSemester';

const select = (data: GetLatestLecturesResult) => {
  return formatLatestLectureToYearSemester(data.content);
};

export function useLatestLectures() {
  return useQuery(['latestLectures'], () => fetchLatestLectures(), { select });
}
