import Cookies from 'js-cookie';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

interface NativeDeviceContext {
  nativeDeviceType: 'android' | 'ios' | null;
  nativeDeviceVersion: string | null;
  nativeAppVersion: string | null;
}

const nativeDeviceContext = createContext<NativeDeviceContext>({
  nativeDeviceType: null,
  nativeDeviceVersion: null,
  nativeAppVersion: null,
});

export const NativeDeviceProvider = ({ children }: PropsWithChildren<unknown>) => {
  const { Provider } = nativeDeviceContext;

  const value = useMemo((): NativeDeviceContext => {
    const nativeDeviceType = (Cookies.get('x-os-type') ?? null) as NativeDeviceContext['nativeDeviceType'];
    const nativeDeviceVersion = Cookies.get('x-os-version') ?? null;
    const nativeAppVersion = Cookies.get('x-app-version') ?? null;

    return { nativeDeviceType, nativeDeviceVersion, nativeAppVersion };
  }, []);

  return <Provider value={value}>{children}</Provider>;
};

export const useNativeDevice = () => useContext(nativeDeviceContext);
