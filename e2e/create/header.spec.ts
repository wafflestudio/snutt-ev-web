import { test } from '@playwright/test';

import { CreatePage } from './_page';

test('헤더바가 잘 보여진다', async ({ page }) => {
  // 페이지에 접속하면
  const create = new CreatePage(page);
  await create.visit(2444);

  // 헤더에 강의 내용이 적절히 보여져야 한다

  // 학기 목록 드롭다운이 정상 동작해야 한다

  // 강의평 점수 영역이 정상 동작해야 한다

  // 강의평 생성 버튼이 정상 동작해야 한다
});
