import { ThemeType } from '@/lib/styles/theme';

declare global {
  interface Window {
    // native -> webview 통신을 위한 함수들
    changeTheme(theme: ThemeType): void;
  }
}
