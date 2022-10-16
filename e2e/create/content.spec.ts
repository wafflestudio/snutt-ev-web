import { test } from '@playwright/test';

import { CreatePage } from './_page';

test('강의평 및 별점 섹션이 정상 동작한다', async ({ page }) => {
  // 페이지에 접속하면
  const create = new CreatePage(page);
  await create.visit(2444);

  // 강의평 별점 기능이 정상 동작해야 한다
  // TODO:

  // 강의평 내용이 정상 동작해야 한다
  // TODO:

  // 제출 기능이 정상 동작해야 한다
});
