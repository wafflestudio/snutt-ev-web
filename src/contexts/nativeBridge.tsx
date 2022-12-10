import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

import { useNativeDevice } from './nativeDevice';

interface NativeBridge {
  close(): void;
}

const notReachableErrorFunction = () => {
  if (process.env.NODE_ENV === 'development') throw Error('cannot reach here');
};

const nativeBridgeContext = createContext<NativeBridge>({ close: notReachableErrorFunction });

export const NativeBridgeProvider = ({ children }: PropsWithChildren<unknown>) => {
  const { Provider } = nativeBridgeContext;
  const { nativeDeviceType } = useNativeDevice();

  const value = useMemo(
    () => ({
      close: () => console.log(`${nativeDeviceType} close bridge call: not implemented`),
    }),
    [nativeDeviceType],
  );

  return <Provider value={value}>{children}</Provider>;
};

export const useNativeBridge = () => useContext(nativeBridgeContext);
