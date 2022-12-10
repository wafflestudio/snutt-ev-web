/**
 *
 * @param dividend 피제수 (자연수)
 * @param divisor 제수 (자연수)
 * @returns [몫, 나머지]
 */
export const divide = (dividend: number, divisor: number) => {
  const quotient = dividend / divisor;
  const remainder = dividend % divisor;

  return [parseInt(`${quotient}`), parseInt(`${remainder}`)];
};
