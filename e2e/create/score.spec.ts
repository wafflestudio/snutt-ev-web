import { test } from '@playwright/test';

import { CreatePage } from './_page';

test('점수 섹션이 정상 동작한다', async ({ page }) => {
  // 페이지에 접속하면
  const create = new CreatePage(page);
  await create.visit(2444);

  // 강의평 점수 툴팁이 정상 동작해야 한다
  // TODO:

  // 강의평 점수 영역이 정상 동작해야 한다
  // TODO:

  // 강의평 생성 버튼이 정상 동작해야 한다
  // TODO:
});
