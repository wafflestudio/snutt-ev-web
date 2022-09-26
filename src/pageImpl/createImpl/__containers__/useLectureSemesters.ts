import { useQuery } from '@tanstack/react-query';

import { fetchSemesterLectures } from '@/lib/api/apis';

export function useLectureSemesters(id: number) {
  return useQuery(['lectureSemester', id], () => fetchSemesterLectures({ params: { id } }), {
    enabled: !isNaN(id),
  });
}
