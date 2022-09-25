import { useQuery } from '@tanstack/react-query';

import { fetchLatestLectures } from '@/lib/api/apis';
import { LatestLectureDTO } from '@/lib/dto/core/latestLecture';
import { GetLatestLecturesResult } from '@/lib/dto/getLatestLectures';

type Return = {
  year: number;
  semester: number;
  lectures: LatestLectureDTO[];
}[];

// TODO: need unit testcode
// mutable, be careful to modify
const select = (data: GetLatestLecturesResult): Return => {
  const ret = [] as Return;

  data.content.forEach((lecture) => {
    const { taken_semester, taken_year } = lecture;

    const existYearSemester = ret.find(
      ({ year, semester }) =>
        year === taken_year && semester === taken_semester,
    );

    // 기존에 없을 경우, 새로 만들어서 푸시
    if (existYearSemester) {
      existYearSemester.lectures.push(lecture);
    }

    // 기존에 있을 경우, 거기다가 바로 푸시
    else
      ret.push({
        year: taken_year,
        semester: taken_semester,
        lectures: [lecture],
      });
  });

  return ret.sort((a, b) =>
    a.year === b.year ? b.semester - a.semester : b.year - a.year,
  );
};

export function useLatestLectures() {
  return useQuery(['latestLectures'], () => fetchLatestLectures(), { select });
}
