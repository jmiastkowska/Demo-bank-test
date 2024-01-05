import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('pulpit tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.password;

    await page.goto('/');
    const loginPage = new LoginPage(page);

    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });

  test('quick payment with correct data', async ({ page }) => {
    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'zwrot';

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.receiverIdDropdown.selectOption(receiverId);
    await pulpitPage.transferAmountInput.fill(transferAmount);
    await pulpitPage.transferTitleInput.fill(transferTitle);
    await pulpitPage.buttonWykonaj.click();
    await pulpitPage.buttonClose.click();

    await expect(pulpitPage.showMessages).toHaveText(
      `Przelew wykonany! Chuck Demobankowy - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('successful mobile top-up', async ({ page }) => {
    const topupReceiver1 = '503 xxx xxx';
    const topupAmount = '30';
    const expectedMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver1}`;

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.topupReceiver1Dropdown.selectOption(topupReceiver1);
    await pulpitPage.topupAmountInput.fill(topupAmount);
    await pulpitPage.topUpAgreementSpan.click();
    await pulpitPage.buttonDoladujTel.click();

    await expect(pulpitPage.showMessages).toHaveText(expectedMessage);
  });

  test('correct balance aftersuccessful mobile top-up', async ({ page }) => {
    const topupReceiver1 = '503 xxx xxx';
    const topupAmount = '30';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(topupAmount);

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.topupReceiver1Dropdown.selectOption(topupReceiver1);
    await pulpitPage.topupAmountInput.fill(topupAmount);
    await pulpitPage.topUpAgreementSpan.click();
    await pulpitPage.buttonDoladujTel.click();
    await pulpitPage.buttonClose.click();

    await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`);
  });
});
