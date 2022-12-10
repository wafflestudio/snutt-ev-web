import { ThemeType } from '@/styles/theme';

declare global {
  interface Window {
    // git 버전
    git: string;

    // native -> webview 통신을 위한 함수들
    changeTheme(theme: ThemeType): void;
  }
}
