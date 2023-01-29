import { ThemeType } from '@/styles/theme';

declare global {
  interface Window {
    // git 버전
    git: { sha: string; tag: string };

    // native -> webview 통신을 위한 함수들
    changeTheme(theme: ThemeType): void;

    // android bridge
    Snutt?: { postMessage: NativeBridgePostMessage };

    // iOS bridge
    webkit?: { messageHandlers?: { snutt: { postMessage: NativeBridgePostMessage } } };
  }
}

type NativeBridgePostMessage = (value: string) => void;
