import { useEffect, useRef } from 'react';
export const useLog = (callback: () => void, { enabled = true } = {}) => {
  const firedRef = useRef<boolean>();

  useEffect(() => {
    if (!enabled) return;
    if (firedRef.current) return;

    firedRef.current = true;
    callback();
  }, [enabled, callback]);
};
