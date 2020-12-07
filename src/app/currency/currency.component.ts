import { Component, OnInit } from '@angular/core';
import { CurrencyAPIService } from '../service/currencydata.service';
import { CurrencyFlagsService } from '../service/currenc-flags/currency-flags.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
  itemsArr = [];
  itemsArrCrypto = []
  dropDownArr = [];

  baseCurrency: string = "USD";
  baseCurrencyForCrypto = "USD";
  query: string = "";
  dateObj: Date = new Date();
  dateStr: string = "";

  currencyRateData: number[] = [];
  datesArr: string[] = [];

  count: number = 10;

  service: CurrencyFlagsService;


  constructor(private restApiService: CurrencyAPIService, private inComponent: CurrencyFlagsService) {
    this.service = inComponent;
  }


  ngOnInit(): void {

    const count: number = 10;
    this.restApiService.getDataByCurrencyBase(this.baseCurrency).subscribe((result: Object) => {


      const ratesObj = result['Item']['rates']['M'];
      this.baseCurrency = result['Item']['base']['S'];

      for (const property in ratesObj) {
        this.dropDownArr.push(property);
        this.itemsArr.push({
          currency: property,
          rate: ratesObj[property]['N']
        });
      }
    });
    this.restApiService.getCryptoData(this.baseCurrencyForCrypto).subscribe((result: Object) => {

      const ratesObj = result['Item']['rates']['M'];
      //this.baseCurrency = result['Item']['base']['S'];

      for (const property in ratesObj) {
        // this.dropDownArr.push(property);
        this.itemsArrCrypto.push({
          currency: property,
          rate: ratesObj[property]['N']
        });
      }
    });



  }

  changeMenu(currency: string): void {
    this.itemsArr = [];
    this.dropDownArr = [];

    console.log(currency);
    this.restApiService.getDataByCurrencyBase(currency).subscribe((result: Object) => {
      const ratesObj = result['Item']['rates']['M'];
      this.baseCurrency = result['Item']['base']['S'];

      for (const property in ratesObj) {
        this.dropDownArr.push(property);
        this.itemsArr.push({
          currency: property,
          rate: ratesObj[property]['N']
        });
      }
      this.query = "";
    });
  }
}




