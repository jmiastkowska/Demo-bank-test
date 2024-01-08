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
}
