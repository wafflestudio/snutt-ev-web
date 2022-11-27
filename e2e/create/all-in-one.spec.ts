import { expect, test } from '@playwright/test';

import { CreatePage } from './_page';

test('전체 플로우 점검', async ({ page }) => {
  // 페이지에 접속하면
  const create = new CreatePage(page);
  await create.visit(325);

  const content = '강의평 서른글자 제한을 뚫기 위한 서른글자짜리 테스트 강의평입니다.';

  await create.get('header-semester-button').click();
  await create.get('header-semester-listitem').filter({ hasText: '2018-1학기' }).click();
  await create.get('score-slider-top').fill('4', { force: true });
  await create.get('score-slider-left').fill('2', { force: true });
  await create.get('cta-button').click();
  await create.get('rating-star').nth(3).click(); // 4점
  await create.get('content-input').type(content);

  await Promise.all([
    create
      .getPage()
      .waitForRequest(
        (req) =>
          req.method() === 'POST' &&
          req.url().includes('/v1/semester-lectures/62865/evaluations') &&
          req.postData() ===
            JSON.stringify({ content, grade_satisfaction: 4, teaching_skill: 2, gains: 3, life_balance: 3, rating: 4 }),
      ),
    create.get('cta-button').click(),
  ]);

  await expect(create.getPage()).toHaveURL('/detail?id=325');
});
