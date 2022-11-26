import '@emotion/react';

type Color = `#${string}`;

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      bg: {
        default: Color; // 기본
        form: Color; // 폼컨트롤
        info: Color; // 정보 안내
        divider: Color; // 디버이더
      };
      text: {
        default: Color; // 기본
        info: Color; // 더보기/접기
        link: Color; // 링크
        toggle: Color; // 메인 페이지 토글 칩스버튼
        desc: Color; // 설명 텍스트
        form: Color; // 폼 텍스트
      };
      icon: { filled: { fill: Color; stroke: Color }; outlined: { fill: Color; stroke: Color } };
      border: {
        divider: Color;
        form: Color;
        info: Color;
      };
      button: {
        primary: {
          default: { bg: Color; text: Color };
          disabled: { bg: Color; text: Color };
        };
        secondary: {
          default: { bg: Color; text: Color };
          disabled: { bg: Color; text: Color };
        };
      };
    };
  }
}
