import { Page } from 'playwright-core';

export class PulpitPage {
  constructor(private page: Page) {}

  receiverIdDropdown = this.page.locator('#widget_1_transfer_receiver');
  transferAmountInput = this.page.locator('#widget_1_transfer_amount');
  transferTitleInput = this.page.locator('#widget_1_transfer_title');
  buttonWykonaj = this.page.getByRole('button', { name: 'wykonaj' });
  buttonClose = this.page.getByTestId('close-button');
  topupReceiver1Dropdown = this.page.locator('#widget_1_topup_receiver');
  topupAmountInput = this.page.locator('#widget_1_topup_amount');
  topUpAgreementSpan = this.page.locator(
    '#uniform-widget_1_topup_agreement span',
  );
  buttonDoladujTel = this.page.getByRole('button', { name: 'doładuj telefon' });
  moneyValue = this.page.locator('#money_value');

  showMessages = this.page.locator('#show_messages');
}
