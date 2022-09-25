import { expect, test } from '@playwright/test';

import { MainPage } from './_page';

test('교양 강의평 둘러보기', async ({ page }) => {
  // 페이지에 접속하면
  const main = new MainPage(page);
  await main.goto();

  // 태그 피커가 보여야 한다
  const container = main.findByTestId('main-category-picker');
  await expect(container).toHaveCount(1);

  // 토글 기능이 정상 작동해야 한다
  const toggleChip = main.findByTestId('main-category-toggle-chip');
  const recentChip = toggleChip.locator('text=최신');
  const recommendChip = toggleChip.locator('text=추천');
  const detailText = main.findByTestId('main-category-detail');
  await expectChipStatus('recent');
  await recommendChip.click();
  await expectChipStatus('recommend');
  await recommendChip.click();
  await expectChipStatus('recommend');
  await recentChip.click();
  await expectChipStatus('recent');

  // helpers
  async function expectChipStatus(status: 'recent' | 'recommend') {
    return Promise.all([
      expect(recentChip).toHaveAttribute('aria-selected', `${status === 'recent'}`),
      expect(recommendChip).toHaveAttribute('aria-selected', `${status === 'recommend'}`),
      expect(detailText).toHaveText({ recent: '최근 등록된 강의평', recommend: '학우들의 추천 강의' }[status]),
      expect(main.getPage()).toHaveURL(`/main?tag=${{ recent: 1, recommend: 2 }[status]}`),
    ]);
  }
});
