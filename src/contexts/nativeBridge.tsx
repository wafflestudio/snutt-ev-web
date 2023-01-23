import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

import { truffleClient } from '@/truffle';

import { useNativeDevice } from './nativeDevice';

interface NativeBridge {
  close(): void;
}

const notReachableErrorFunction = () => {
  if (process.env.NODE_ENV === 'development') throw Error('cannot reach here');
  else truffleClient.capture(new Error('reached NativeBridgeProvider not reachable erorr function'));
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

        if (!bridgeCaller) {
          truffleClient.capture(
            new Error(`${nativeDeviceType} native bridge message handler not defined: call ${message}`),
          );
          return;
        }

        bridgeCaller.postMessage(message);
      } catch (err) {
        truffleClient.capture(new Error(`snutt bridge call exception occurred, native: ${nativeDeviceType}`));
      }
    };

    return {
      close: () => postMessage({ name: 'close' }),
    };
  }, [nativeDeviceType]);

  return <Provider value={value}>{children}</Provider>;
};

export const useNativeBridge = () => useContext(nativeBridgeContext);
