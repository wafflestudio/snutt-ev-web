import { test, expect } from '@playwright/test';

test('AppBar', async ({ page }) => {
  await page.goto('/main');
  const appBar = page.locator('[data-test=app-bar]');
  await expect(appBar).toContainText('강의평');
});
