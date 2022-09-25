import { LatestLectureDTO } from '@/lib/dto/core/latestLecture';

type Return = {
  year: number;
  semester: number;
  lectures: LatestLectureDTO[];
}[];

/**
 * 강의 목록을 년도-학기 에 맞게 포맷하는 함수
 * 네이밍 추천받습니다..
 *
 * @param lectures 강의 목록
 * @returns 년도 학기 로 re-format 된 배열
 */
export const formatLecturesToYearSemesterLectures = (lectures: LatestLectureDTO[]): Return => {
  const ret = [] as Return;

  lectures.forEach((lecture) => {
    const { taken_semester, taken_year } = lecture;

    const existYearSemester = ret.find(({ year, semester }) => year === taken_year && semester === taken_semester);

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

  return ret.sort((a, b) => (a.year === b.year ? b.semester - a.semester : b.year - a.year));
};
