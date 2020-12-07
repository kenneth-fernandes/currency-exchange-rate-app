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
  dropDownArr = [];

  baseCurrency: string = "USD";

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
      // for (let i = this.count; i > 0; i -= 1) {
      //   this.dateObj = new Date();
      //   this.dateObj.setUTCDate(this.dateObj.getUTCDate() - (30 * i));
      //   this.dateStr = this.dateObj.getUTCFullYear() + "-" + this.dateObj.getUTCMonth() + "-" + this.dateObj.getUTCDay();
      //   console.log(this.baseCurrency);
      //   this.restApiService.getDataByCurrencyBaseAndDate(this.baseCurrency, "USD", this.dateStr).subscribe((result: Object) => {

      //     this.currencyRateData.push(result['rates']['USD']);
      //     this.datesArr.push(result['date']);
      //   });

      // }
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

      for (let i = this.count; i > 0; i -= 1) {
        this.dateObj = new Date();
        this.dateObj.setUTCDate(this.dateObj.getUTCDate() - (30 * i));
        this.dateStr = this.dateObj.getUTCFullYear() + "-" + this.dateObj.getUTCMonth() + "-" + this.dateObj.getUTCDay();

        this.restApiService.getDataByCurrencyBaseAndDate(this.baseCurrency, "USD", this.dateStr).subscribe((result: Object) => {

          if (this.count === this.currencyRateData.length && this.count === this.datesArr.length) {
            console.log(this.currencyRateData.length, this.datesArr.length);
            this.currencyRateData = [];
            this.datesArr = [];

          }
          this.currencyRateData.push(result['rates']['USD']);
          this.datesArr.push(result['date']);
        });

      }

      this.query = "";
    });
  }
}




