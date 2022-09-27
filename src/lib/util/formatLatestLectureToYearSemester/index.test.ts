import { expect, test } from '@jest/globals';

import { LatestLectureDTO } from '@/lib/dto/core/latestLecture';

import { formatLatestLectureToYearSemester as target } from '.';

const getDummyLecture = (id: number, year: number, semester: number): LatestLectureDTO => ({
  id,
  title: '',
  instructor: '',
  department: '',
  course_number: '',
  credit: 3,
  academic_year: '',
  category: '',
  classification: '',
  taken_year: year,
  taken_semester: semester,
});

test('formatLatestLectureToYearSemester', () => {
  const testcases = [
    {
      input: [],
      output: [],
    },
    {
      input: [getDummyLecture(1, 2022, 2)],
      output: [{ year: 2022, semester: 2, lectures: [getDummyLecture(1, 2022, 2)] }],
    },
    {
      input: [getDummyLecture(1, 2022, 2), getDummyLecture(2, 2022, 2)],
      output: [{ year: 2022, semester: 2, lectures: [getDummyLecture(1, 2022, 2), getDummyLecture(2, 2022, 2)] }],
    },
    {
      input: [getDummyLecture(1, 2022, 1), getDummyLecture(2, 2022, 2)],
      output: [
        { year: 2022, semester: 2, lectures: [getDummyLecture(2, 2022, 2)] },
        { year: 2022, semester: 1, lectures: [getDummyLecture(1, 2022, 1)] },
      ],
    },
    {
      input: [
        getDummyLecture(1, 2022, 1),
        getDummyLecture(2, 2022, 2),
        getDummyLecture(3, 2021, 2),
        getDummyLecture(4, 2022, 2),
      ],
      output: [
        { year: 2022, semester: 2, lectures: [getDummyLecture(2, 2022, 2), getDummyLecture(4, 2022, 2)] },
        { year: 2022, semester: 1, lectures: [getDummyLecture(1, 2022, 1)] },
        { year: 2021, semester: 2, lectures: [getDummyLecture(3, 2021, 2)] },
      ],
    },
  ];

  testcases.forEach((tc) => {
    expect(target(tc.input)).toStrictEqual(tc.output);
  });
});
