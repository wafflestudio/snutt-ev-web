import { useQuery } from '@tanstack/react-query';

import { fetchLatestLectures } from '@/lib/api/apis';
import { GetLatestLecturesResult } from '@/lib/dto/getLatestLectures';
import { formatLecturesToYearSemesterLectures } from '@/usecases/lecture/formatLecturesToYearSemesterLectures';

const select = (data: GetLatestLecturesResult) => {
  return formatLecturesToYearSemesterLectures(data.content);
};

export function useLatestLectures() {
  return useQuery(['latestLectures'], () => fetchLatestLectures(), { select });
}
