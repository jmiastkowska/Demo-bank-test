import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('pulpit tests', () => {
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.password;

    await page.goto('/');
    const loginPage = new LoginPage(page);

    await loginPage.login(userId, userPassword);
    pulpitPage = new PulpitPage(page);
  });

  test('quick payment with correct data', async ({ page }) => {
    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'zwrot';

    await pulpitPage.executeQuickPayment(
      receiverId,
      transferAmount,
      transferTitle,
    );

    await expect(pulpitPage.messagesText).toHaveText(
      `Przelew wykonany! Chuck Demobankowy - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('successful mobile top-up', async ({ page }) => {
    const topupReceiver1 = '503 xxx xxx';
    const topupAmount = '30';
    const expectedMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver1}`;

    await pulpitPage.executeMobileTopUp(topupReceiver1, topupAmount);

    await expect(pulpitPage.messagesText).toHaveText(expectedMessage);
  });

  test('correct balance aftersuccessful mobile top-up', async ({ page }) => {
    const topupReceiver1 = '503 xxx xxx';
    const topupAmount = '30';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(topupAmount);

    await pulpitPage.executeMobileTopUp(topupReceiver1, topupAmount);

    await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`);
  });
});
