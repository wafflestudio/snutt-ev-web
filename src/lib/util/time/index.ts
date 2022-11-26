import { divide } from '@/lib/util/math';

export const SECOND = 1000;
export const MINUTE = SECOND * 60;

/**
 *
 * @param millis 59분 59초 이하의 millisecond 단위 duration
 * @param options 옵션
 * @returns mm:ss 포맷
 */
export const toMinuteSecondFormat = (millis: number, { ignoreNegative = true } = {}): string => {
  if (millis < 0) {
    if (ignoreNegative === false) {
      return `-${toMinuteSecondFormat(-1 * millis)}`;
    }
    return '00:00';
  }

  const [seconds] = divide(millis, SECOND);
  const [minute, second] = divide(seconds, MINUTE / SECOND);

  return `${`${minute}`.padStart(2, '0')}:${`${second}`.padStart(2, '0')}`;
};
