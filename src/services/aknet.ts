import axios from 'axios';
import { isValidNumber } from '../lib/helpers';

type PersonalAccountType = string;

export interface InternetProviderService {
  getBalance: () => Promise<string>;
}

export class AknetService implements InternetProviderService {
  constructor(private personalAccount: PersonalAccountType) {}

  async getBalance() {
    if (!isValidNumber(this.personalAccount)) {
      return Promise.reject('Не корректный лицевой счет!');
    }

    const balance = await this.fetchBalance();
    return balance;
  }

  private getUrl(): string {
    return (
      'https://aknet.kg/system/account/checkbalance?paycode=' +
      this.personalAccount
    );
  }

  private async fetchBalance() {
    const url = this.getUrl();
    const response = await axios.get(url);
    const responseText = response.data;

    if (isValidNumber(responseText)) {
      return Promise.resolve(responseText);
    } else {
      return Promise.reject(responseText);
    }
  }
}
