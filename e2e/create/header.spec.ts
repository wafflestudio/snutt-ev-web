import { expect, test } from '@playwright/test';

import { CreatePage } from './_page';

test('헤더바에 강의 내용이 적절히 보여진다', async ({ page }) => {
  // 페이지에 접속하면
  const create = new CreatePage(page);
  await create.visit();

  // 헤더에 강의 내용이 적절히 보여져야 한다
  await expect(create.get('header-lecture-name')).toHaveText('물리학 1');
  await expect(create.get('header-lecture-detail')).toHaveText('문송기 / 3학점 (교양)');
});

test('드롭다운 내용이 적절히 보여진다', async ({ page }) => {
  // 페이지에 접속하면
  const create = new CreatePage(page);
  await create.visit();

  // 드롭다운 초기 ui가 잘 보여진다
  await expect(create.get('header-semester-button')).toHaveText('2022-여름학기');
  await expect(create.get('header-semester-list')).toHaveCount(0);

  // 드롭다운을 열면 잘 보여진다
  await create.get('header-semester-button').click();
  await expect(create.get('header-semester-list')).toHaveCount(1);
  await expect(create.get('header-semester-listitem')).toHaveCount(9);

  // 학기 변경이 잘 동작한다
  await create.get('header-semester-listitem').filter({ hasText: '2018-1학기' }).click();
  await expect(create.get('header-semester-button')).toHaveText('2018-1학기');
});
