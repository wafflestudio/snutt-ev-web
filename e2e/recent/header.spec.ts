import { expect, test } from '@playwright/test';

import { RecentPage } from './_page';

test('헤더바가 잘 보여진다', async ({ page }) => {
  // 페이지에 접속하면
  const recent = new RecentPage(page);
  await recent.goto();

  // app bar 에 적절한 문구가 보여져야 한다
  const appBar = recent.findByTestId('app-bar');
  await expect(appBar).toContainText('최근 강의 목록');
});
