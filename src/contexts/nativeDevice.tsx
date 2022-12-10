import Cookies from 'js-cookie';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

interface NativeDeviceContext {
  nativeDeviceType: 'android' | 'ios';
}

const nativeDeviceContext = createContext<NativeDeviceContext>({ nativeDeviceType: 'android' });

export const NativeDeviceProvider = ({ children }: PropsWithChildren<unknown>) => {
  const { Provider } = nativeDeviceContext;

  const value = useMemo((): NativeDeviceContext => {
    const nativeDeviceType = Cookies.get('x-os-type') === 'ios' ? 'ios' : 'android';

    return { nativeDeviceType };
  }, []);

  return <Provider value={value}>{children}</Provider>;
};

export const useNativeDevice = () => useContext(nativeDeviceContext);
