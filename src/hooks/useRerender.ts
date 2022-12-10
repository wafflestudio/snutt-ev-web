import { useState } from 'react';

export const useRerender = () => {
  const [, setCount] = useState(0);

  return () => setCount((c) => c + 1);
};
