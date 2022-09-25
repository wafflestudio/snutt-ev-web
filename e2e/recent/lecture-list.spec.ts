import { expect, test } from '@playwright/test';

import { getTestCookie } from '../utils/cookie';
import { withCookie } from '../utils/withCookiePage';
import { RecentPage } from './_page';

const sTitle = '[data-testid=recent-semester-title]'; // title selector
const sLecture = '[data-testid=recent-lecture-item]'; // lecture selector

const TEST_RECENT_LECTURES_EXIST = 'TEST_RECENT_LECTURES_EXIST';

test(
  '최근 들은 강의가 있을 경우 없다고 보여진다',
  withCookie(
    // 지난 학기에 들은 강의가 있을 경우
    [getTestCookie(TEST_RECENT_LECTURES_EXIST, 'false')],
    async ({ page }) => {
      // 페이지에 접속하면
      const recent = new RecentPage(page);
      await recent.goto();

      const lectures = recent.findByTestId('recent-lecture-item');
      const emptyItem = recent.findByTestId('recent-empty');

      // 강의는 안 보여져야 한다
      await expect(lectures).toHaveCount(0);

      // 최근 학기에 수강한 강의가 없다고 보여져야 한다
      await expect(emptyItem).toHaveCount(1);
    },
  ),
);

test(
  '최근 들은 강의가 있을 경우 강의 목록이 잘 보여진다',
  withCookie(
    // 지난 학기에 들은 강의가 있을 경우
    [getTestCookie(TEST_RECENT_LECTURES_EXIST, 'true')],
    async ({ page }) => {
      // 페이지에 접속하면
      const recent = new RecentPage(page);
      await recent.goto();

      const semesters = recent.findByTestId('recent-semester');
      const lectures = recent.findByTestId('recent-lecture-item');

      // 2022년 여름학기, 2022년 1학기 두 학기가 순서대로 보여져야 한다
      await expect(semesters).toHaveCount(2);
      await expect(semesters.nth(0).locator(sTitle)).toHaveText('2022년 여름학기');
      await expect(semesters.nth(1).locator(sTitle)).toHaveText('2022년 1학기');

      // 각 학기별로 3개씩의 강의가 보여져야 한다
      await expect(semesters.nth(0).locator(sLecture)).toHaveCount(3);
      await expect(semesters.nth(1).locator(sLecture)).toHaveCount(3);

      // 강의 내용이 제대로 보여져야 한다
      await expect(lectures.nth(0)).toContainText('물리학');
      await expect(lectures.nth(0)).toContainText('천문학부');
      await expect(lectures.nth(0)).toContainText('문송기');
      await expect(lectures.nth(2)).toContainText('컴퓨팅');
      await expect(lectures.nth(2)).toContainText('기초교육원');
      await expect(lectures.nth(2)).toContainText('1학년');
      await expect(lectures.nth(3)).toContainText('(공유)AI기초프로그래밍');
      await expect(lectures.nth(3)).toContainText('혁신공유학부');
      await expect(lectures.nth(3)).toContainText('1학년');
    },
  ),
);

test(
  '최근 들은 강의가 있을 경우 강의 상세 링크가 정상 동작한다',
  withCookie(
    // 지난 학기에 들은 강의가 있을 경우
    [getTestCookie(TEST_RECENT_LECTURES_EXIST, 'true')],
    async ({ page }) => {
      // 페이지에 접속하면
      const recent = new RecentPage(page);
      await recent.goto();

      const lectures = recent.findByTestId('recent-lecture-item');

      await lectures.filter({ hasText: '물리학' }).click();
      await expect(page).toHaveURL('/detail?id=2444');
    },
  ),
);

test(
  '최근 들은 강의가 있을 경우 강의평 작성 링크가 정상 동작한다',
  withCookie(
    // 지난 학기에 들은 강의가 있을 경우
    [getTestCookie(TEST_RECENT_LECTURES_EXIST, 'true')],
    async ({ page }) => {
      // 페이지에 접속하면
      const recent = new RecentPage(page);
      await recent.goto();

      const lectures = recent.findByTestId('recent-lecture-item');

      await lectures.filter({ hasText: '물리학' }).locator('[data-testid=recent-lecture-write-btn]').click();
      await expect(page).toHaveURL('/create?id=2444');
    },
  ),
);
