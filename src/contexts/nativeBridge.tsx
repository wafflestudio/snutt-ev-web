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

  const value = useMemo(() => {
    const postMessage = (value: unknown) => {
      // TODO: add testcode for bridge call
      const windowPostMessage = {
        android: window.Snutt?.postMessage,
        ios: window.webkit?.messageHandlers?.snutt.postMessage,
      }[nativeDeviceType];

      const message = JSON.stringify(value);

      if (windowPostMessage) windowPostMessage(message);
      else {
        // TODO: capture sentry
        console.error(`${nativeDeviceType} native bridge message handler not defined: call ${message}`);
      }
    };

    return {
      close: () => postMessage({ name: 'close' }),
    };
  }, [nativeDeviceType]);

  return <Provider value={value}>{children}</Provider>;
};

export const useNativeBridge = () => useContext(nativeBridgeContext);
