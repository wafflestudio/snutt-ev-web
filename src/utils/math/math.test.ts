import { expect, test } from '@jest/globals';

import { divide } from '.';

test('divide', () => {
  expect(divide(5, 3)).toEqual([1, 2]);
  expect(divide(6, 3)).toEqual([2, 0]);
  expect(divide(2, 1)).toEqual([2, 0]);
  expect(divide(101234, 258)).toEqual([392, 98]);
});
