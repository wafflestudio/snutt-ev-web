import { Page, test } from '@playwright/test';

type Callback = (args: { page: Page }) => Promise<void>;
type Return = Parameters<typeof test>[1];

type Cookie = { name: string; value: string; path: string; domain: string };
// TODO: ts 및 테스트 에러 확인
export const withCookie = (cookies: Cookie[], callback: Callback): Return => {
  return async ({ browser }) => {
    const context = await browser.newContext();
    await context.addCookies(
      cookies.map(({ name, value, path, domain }) => ({
        name,
        value,
        path,
        domain,
      })),
    );
    const page = await context.newPage();
    return callback({ page });
  };
};
