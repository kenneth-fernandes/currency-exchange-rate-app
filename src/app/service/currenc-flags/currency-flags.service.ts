import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyFlagsService {

  constructor() { }

  currencyFlag = {
    "HRK": "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Croatia_for_discussion.svg",
    "CHF": "https://upload.wikimedia.org/wikipedia/commons/f/f2/Civil_Ensign_of_Switzerland.svg",
    "MXN": "https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg",
    "ZAR": "https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg",
    "INR": "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
    "THB": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg",
    "CNY": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg",
    "AUD": "https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg",
    "ILS": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Israel.svg",
    "KRW": "https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg",
    "JPY": "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg",
    "PLN": "https://upload.wikimedia.org/wikipedia/en/1/12/Flag_of_Poland.svg",
    "GBP": "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",
    "IDR": "https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg",
    "HUF": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg",
    "PHP": "https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_the_Philippines.svg",
    "TRY": "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg",
    "RUB": "https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg",
    "HKD": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Flag_of_Hong_Kong.svg",
    "ISK": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Iceland.svg",
    "EUR": "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg",
    "DKK": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Denmark.svg",
    "CAD": "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg",
    "MYR": "https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Malaysia.svg",
    "USD": "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
    "BGN": "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Bulgaria.svg",
    "NOK": "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg",
    "RON": "https://upload.wikimedia.org/wikipedia/commons/7/73/Flag_of_Romania.svg",
    "SGD": "https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Singapore.svg",
    "CZK": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg",
    "SEK": "https://upload.wikimedia.org/wikipedia/en/4/4c/Flag_of_Sweden.svg",
    "NZD": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg",
    "BRL": "https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg",
  }

  getFlagURL(currency: string): string {
    return this.currencyFlag[currency];
  }
}
