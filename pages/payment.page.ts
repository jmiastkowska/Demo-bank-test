import { Page } from 'playwright-core';

export class PaymentPage {
  constructor(private page: Page) {}

  transferReceiverInput = this.page.getByTestId('transfer_receiver');
  transferAccountInput = this.page.getByTestId('form_account_to');
  transfetAmountInput = this.page.getByTestId('form_amount');

  transferButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
  closeButton = this.page.getByTestId('close-button');

  MessageText = this.page.locator('#show_messages');
}
