import { Page } from 'playwright-core';
import { SideMenuComponent } from '../components/side-menu.component';

export class PulpitPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);
  
  receiverIdDropdown = this.page.locator('#widget_1_transfer_receiver');
  transferAmountInput = this.page.locator('#widget_1_transfer_amount');
  transferTitleInput = this.page.locator('#widget_1_transfer_title');
  buttonWykonaj = this.page.getByRole('button', { name: 'wykonaj' });
  buttonClose = this.page.getByTestId('close-button');
  topupReceiver1Dropdown = this.page.locator('#widget_1_topup_receiver');
  topupAmountInput = this.page.locator('#widget_1_topup_amount');
  topUpAgreementCheckbox = this.page.locator(
    '#uniform-widget_1_topup_agreement span',
  );

  topupExecuteButton = this.page.getByRole('button', { name: 'doładuj telefon' });
  moneyValue = this.page.locator('#money_value');

  messagesText = this.page.locator('#show_messages');
  userNameText = this.page.getByTestId('user-name');

  async quickPayment(receiverId:string, transferAmount:string, transferTitle:string): Promise <void>{
    await this.receiverIdDropdown.selectOption(receiverId);
    await this.transferAmountInput.fill(transferAmount);
    await this.transferTitleInput.fill(transferTitle);
    await this.buttonWykonaj.click();
    await this.buttonClose.click();
  }

  async mobileTopUp (topupReceiver1:string, topupAmount:string): Promise<void>{
    await this.topupReceiver1Dropdown.selectOption(topupReceiver1);
    await this.topupAmountInput.fill(topupAmount);
    await this.topUpAgreementCheckbox.click();
    await this.topupExecuteButton.click();
  }
}
