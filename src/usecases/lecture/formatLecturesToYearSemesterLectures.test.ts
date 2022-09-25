import { expect, test } from '@jest/globals';

import { formatLecturesToYearSemesterLectures as target } from './formatLecturesToYearSemesterLectures';

test('비었을 때', () => {
  expect(target([])).toStrictEqual([]);
});

// TODO: add testcases
