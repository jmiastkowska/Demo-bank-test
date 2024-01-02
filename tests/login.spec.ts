import { test, expect } from '@playwright/test';

test.describe('the user login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  });
  
  
  test('login with correct credentials', async ({ page }) => {
    const userId = 'tester12';
  const userPassword = 'testtest';
  const expectedUserName = 'Jan Demobankowy';
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('login with too short user name', async ({ page }) => {
   
    await page.getByTestId('login-input').fill('teste');
    await page.getByTestId('password-input').click();

    await expect(page.getByTestId('error-login-id')).toHaveText(
      'identyfikator ma min. 8 znaków',
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    const userId = 'tester12';
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill('tet');
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText(
      'hasło ma min. 8 znaków',
    );
  });
});
