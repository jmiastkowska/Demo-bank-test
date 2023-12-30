import { test, expect } from '@playwright/test';

test.describe('pulpit tests', () => {
  const url = 'https://demo-bank.vercel.app/';
  const userId = 'tester12';
  const userPassword = 'testtest';

  test('quick payment with correct data', async ({ page }) => {
    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'zwrot';

    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();
    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! Chuck Demobankowy - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('successful mobile top-up', async ({ page }) => {
    const topupReceiver1 = '503 xxx xxx';
    const topupAmount = '30';
    const expectedMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver1}`;

    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.locator('#widget_1_topup_receiver').selectOption(topupReceiver1);
    await page.locator('#widget_1_topup_amount').fill(topupAmount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();

    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });
});
