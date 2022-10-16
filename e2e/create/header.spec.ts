import { expect, test } from '@playwright/test';

import { CreatePage } from './_page';

test('페이지에 접속하면 헤더바가 정상적으로 보여진다', async ({ page }) => {
  // 페이지에 접속하면
  const create = new CreatePage(page);
  await create.visit(2444);

  // 헤더에 강의 내용이 적절히 보여져야 한다
  await expect(create.findByTestId('create-header-lecture-name')).toHaveText('물리학 1');
  await expect(create.findByTestId('create-header-lecture-detail')).toHaveText('문송기 / 3학점 (교양)');

  // 헤더의 학기 목록 드롭다운이 정상 동작해야 한다
  // TODO:
});
