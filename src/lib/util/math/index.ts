export const divide = (a: number, b: number) => {
  const quotient = a / b;
  const remainder = a % b;

  return [parseInt(`${quotient}`), parseInt(`${remainder}`)];
};
