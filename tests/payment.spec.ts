import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('payment tests', () => {
  let paymentPage: PaymentPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.password;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    
    await loginPage.login(userId, userPassword);

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.sideMenu.paymentButton.click();
    
    paymentPage = new PaymentPage(page);
  });

  test('simple payment', async ({ page }) => {
    //Arrange
    const transferReceiver = 'Jan Kowalski';
    const transferAccount = '12 3456 7890 1234 5678 9012 34';
    const transferAmount = '111';
    const expectedMessage = 'Przelew wykonany! 111,00PLN dla Jan Kowalski';
    //Act
    
    await paymentPage.makeTransfer(transferReceiver, transferAccount, transferAmount);
   

    //Assert
    await expect(paymentPage.MessageText).toHaveText(expectedMessage);
  });
});
