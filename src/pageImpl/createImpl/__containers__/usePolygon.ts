import { useState } from 'react';

const defaultValue = 3;

type Score = { top: number; left: number; bottom: number; right: number };

export function usePolygon() {
  const [score, setScore] = useState<Score>({
    top: defaultValue,
    left: defaultValue,
    bottom: defaultValue,
    right: defaultValue,
  });

  const updateScore = (value: number, direction: 'top' | 'left' | 'bottom' | 'right') => {
    const realValue = value;
    const nextValue = realValue < 1 ? 1 : realValue;
    setScore((prev) => ({ ...prev, [direction]: nextValue }));
  };

  return { score, updateScore };
}
