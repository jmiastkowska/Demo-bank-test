import { test, expect } from '@playwright/test';
import { loginData, userId } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('the user login to Demobank', () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test('login with correct credentials', async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.password;
    const expectedUserName = 'Jan Demobankowy';

    await loginPage.login(userId, userPassword);

    const pulpitPage = new PulpitPage(page);
    await expect(pulpitPage.userNameText).toHaveText(expectedUserName);
  });

  test('login with too short user name', async ({ page }) => {
    await loginPage.loginInput.fill('teste');
    await loginPage.passwordInput.click();

    await expect(loginPage.loginError).toHaveText(
      'identyfikator ma min. 8 znaków',
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    const incorrectPassword = 'tet';

    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(incorrectPassword);
    await loginPage.passwordInput.blur();

    await expect(loginPage.passwordError).toHaveText('hasło ma min. 8 znaków');
  });

  test('correct logout', async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.password;
    const expectedWelcomeText = 'Wersja demonstracyjna serwisu Demobank';

    await loginPage.login(userId, userPassword);
    await page.getByTestId('logout-button').click();

    await expect(loginPage.welcomeText).toHaveText(expectedWelcomeText);
  });
});
