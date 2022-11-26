import { useEffect, useRef } from 'react';

type Callback = () => void;

export const useInterval = (callback: Callback, { delay = 250, enabled = true } = {}) => {
  const savedCallback = useRef<Callback>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    if (!enabled) return;

    const tick = () => savedCallback.current?.();
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay, enabled]);
};
