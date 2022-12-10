import { expect, test } from '@jest/globals';

import { toMinuteSecondFormat } from '.';

test('toMinuteSecondFormat', () => {
  expect(toMinuteSecondFormat(-1292346)).toEqual('00:00');
  expect(toMinuteSecondFormat(-1)).toEqual('00:00');
  expect(toMinuteSecondFormat(0)).toEqual('00:00');
  expect(toMinuteSecondFormat(6)).toEqual('00:00');
  expect(toMinuteSecondFormat(1000)).toEqual('00:01');
  expect(toMinuteSecondFormat(129346)).toEqual('02:09');
  expect(toMinuteSecondFormat(1292346)).toEqual('21:32');
});
