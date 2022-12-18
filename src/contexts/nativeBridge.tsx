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
      try {
        // TODO: add testcode for bridge call
        const bridgeCaller = {
          android: window.Snutt,
          ios: window.webkit?.messageHandlers?.snutt,
        }[nativeDeviceType];

        const message = JSON.stringify(value);

        if (bridgeCaller) bridgeCaller.postMessage(message);
        else {
          // TODO: capture sentry
          console.error(`${nativeDeviceType} native bridge message handler not defined: call ${message}`);
        }
      } catch (err) {
        // TODO: capture sentry
        console.log('snutt bridge call exception occurred');
        console.log(err);
      }
    };

    return {
      close: () => postMessage({ name: 'close' }),
    };
  }, [nativeDeviceType]);

  return <Provider value={value}>{children}</Provider>;
};

export const useNativeBridge = () => useContext(nativeBridgeContext);
