import { expect, test } from '@playwright/test';

import { MainPage } from './_page';

test('헤더바가 잘 보여진다', async ({ page }) => {
  // 페이지에 접속하면
  const main = new MainPage(page);
  await main.goto();

  // app bar 에 강의평이라는 문구가 보여져야 한다
  const appBar = main.findByTestId('app-bar');
  await expect(appBar).toContainText('강의평');

  // 검색 버튼을 클릭하면 검색 페이지로 이동해야 한다
  const searchIcon = main.findByTestId('main-search-icon');
  await searchIcon.click();
  await expect(main.getPage()).toHaveURL('/search');
});
