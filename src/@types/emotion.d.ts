import '@emotion/react';

type Color = `#${string}`;

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      bg: Color;
      text: {
        default: Color; // 기본
        info: Color; // 더보기/접기
        link: Color; // 링크
        toggle: Color; // 메인 페이지 토글 칩스버튼
        desc: Color; // 설명 텍스트
      };
      icon: { filled: { fill: Color; stroke: Color }; outlined: { fill: Color; stroke: Color } };
      border: {
        light: Color;
      };
    };
  }
}
