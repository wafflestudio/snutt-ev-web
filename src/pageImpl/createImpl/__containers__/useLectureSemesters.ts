import { useQuery } from '@tanstack/react-query';

import { fetchSemesterLectures } from '@/lib/apis/ev';

export function useLectureSemesters(id: number) {
  return useQuery(['lectureSemester', id], () => fetchSemesterLectures({ params: { id } }), {
    enabled: !isNaN(id),
  });
}
