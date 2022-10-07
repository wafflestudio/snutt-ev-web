import Cookies from 'js-cookie';
import { useCallback, useEffect, useState } from 'react';

import { ThemeType } from '@/lib/styles/theme';

// _app.tsx 에서만 이용하도록 한다.
export const useApplicationThemeType = (initialTheme: ThemeType) => {
  const [themeType, setThemeType] = useState(initialTheme);

  // 테마가 변경될 경우 브라우저 쿠키와 동기화해 준다.
  useEffect(() => {
    Cookies.set('theme', themeType);
  }, [themeType]);

  // useEffect 등의 디펜던시로 들어갈 수 있으므로 useCallback 처리
  const changeThemeType = useCallback((t: ThemeType) => {
    setThemeType(t);
  }, []);

  return { changeThemeType, themeType };
};
