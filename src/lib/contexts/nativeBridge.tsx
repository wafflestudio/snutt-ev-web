import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

interface NativeBridge {
  close(): void;
}

const notReachableErrorFunction = () => {
  if (process.env.NODE_ENV === 'development') throw Error('cannot reach here');
};

const nativeBridgeContext = createContext<NativeBridge>({ close: notReachableErrorFunction });

export const NativeBridgeProvider = ({ children }: PropsWithChildren<unknown>) => {
  const { Provider } = nativeBridgeContext;

  const value = useMemo(
    () => ({
      close: () => console.log('not implemented'),
    }),
    [],
  );

  return <Provider value={value}>{children}</Provider>;
};

export const useNativeBridge = () => useContext(nativeBridgeContext);
