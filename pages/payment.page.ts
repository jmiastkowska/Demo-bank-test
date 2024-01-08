import { Page } from 'playwright-core';
import { SideMenuComponent } from '../components/side-menu.component';

export class PaymentPage {
  constructor(private page: Page) {}
  
  
  
  transferReceiverInput = this.page.getByTestId('transfer_receiver');
  transferAccountInput = this.page.getByTestId('form_account_to');
  transfetAmountInput = this.page.getByTestId('form_amount');

  transferButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
  closeButton = this.page.getByTestId('close-button');

  MessageText = this.page.locator('#show_messages');

  async makeTransfer(transferReceiver: string, transferAccount:string, transferAmount:string): Promise <void> {
    await this.transferReceiverInput.fill(transferReceiver);
    await this.transferAccountInput.fill(transferAccount);
    await this.transfetAmountInput.fill(transferAmount);
    await this.transferButton.click();
    await this.closeButton.click();
  }
}
