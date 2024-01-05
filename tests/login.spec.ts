import { test, expect } from '@playwright/test';
import { loginData, userId } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('the user login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('login with correct credentials', async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.password;
    const expectedUserName = 'Jan Demobankowy';

    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('login with too short user name', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill('teste');
    await loginPage.passwordInput.click();

    await expect(loginPage.loginError).toHaveText(
      'identyfikator ma min. 8 znaków',
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    const incorrectPassword = 'tet';
    const loginPage = new LoginPage(page);

    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(incorrectPassword);
    await loginPage.passwordInput.blur();

    await expect(loginPage.passwordError).toHaveText('hasło ma min. 8 znaków');
  });
});
