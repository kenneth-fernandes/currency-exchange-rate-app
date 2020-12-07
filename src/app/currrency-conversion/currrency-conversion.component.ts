import { Component, OnInit } from '@angular/core';
import { CurrencyAPIService } from '../service/currencydata.service';
import { CurrencyFlagsService } from '../service/currenc-flags/currency-flags.service';

@Component({
  selector: 'app-currrency-conversion',
  templateUrl: './currrency-conversion.component.html',
  styleUrls: ['./currrency-conversion.component.css']
})
export class CurrrencyConversionComponent implements OnInit {
  [x: string]: any;

  currencyRateData: number[] = [];
  datesArr: string[] = [];

  count: number = 40;

  query: string = "";
  fromDateStr: string = "";
  toDateStr: string = "";

  baseCurrency: string = "USD";
  targetCurrency: string = "EUR";
  service: CurrencyFlagsService;

  baseCurrencyAmount = 1;
  targetCurrencyAmount;

  conversionRate = {
    base: 1,
    target: 0
  }


  itemsArr = [];
  dropDownArr = [];

  BASE = 'BASE';
  TARGET = 'TARGET';

  constructor(private restApiService: CurrencyAPIService, private inService: CurrencyFlagsService) {
    this.service = inService;
  }

  ngOnInit(): void {
    this.restApiService.getDataByCurrencyBase(this.baseCurrency).subscribe((result: Object) => {
      const ratesObj = result['Item']['rates']['M'];

      for (const property in ratesObj) {
        if (property === this.targetCurrency) {
          this.conversionRate.target = ratesObj[property]['N'];
          this.targetCurrencyAmount = ratesObj[property]['N'];
        }
        this.dropDownArr.push(property);
        this.itemsArr.push({
          currency: property,
          rate: ratesObj[property]['N']
        });

      }

      console.log(this.itemsArr);

      let startDateObj = new Date();
      startDateObj.setDate(startDateObj.getDate() - this.count);
      this.fromDateStr = startDateObj.getUTCFullYear() + "-" + (startDateObj.getUTCMonth() + 1) + "-" + startDateObj.getUTCDay();

      let endDateObj = new Date();
      this.toDateStr = endDateObj.getUTCFullYear() + "-" + (endDateObj.getUTCMonth() + 1) + "-" + endDateObj.getUTCDay();

      this.restApiService.getHistDataByCurrencyBase(this.baseCurrency, this.fromDateStr, this.toDateStr).subscribe((result: Object) => {
        result = Object.keys(result).sort().reduce(function (data, key) {
          data[key] = result[key];
          return data;
        }, {});
        for (const date in result) {
          if (Object.prototype.hasOwnProperty.call(result, date)) {
            const element = result[date];
            this.datesArr.push(date);
            this.currencyRateData.push(result[date][this.baseCurrency][this.targetCurrency]);
          }
        }
      });
    });

  }

  changeBaseMenu(currency: string): void {
    this.baseCurrency = currency;
    this.baseCurrencyAmount = 1;
    this.restApiService.getDataByCurrencyBase(this.baseCurrency).subscribe((result: Object) => {
      const ratesObj = result['Item']['rates']['M'];
      this.dropDownArr = [];
      this.itemsArr = [];
      for (const property in ratesObj) {
        if (property === this.targetCurrency) {
          this.conversionRate.target = ratesObj[property]['N'];
          this.targetCurrencyAmount = ratesObj[property]['N'];
        }
        this.dropDownArr.push(property);
        this.itemsArr.push({
          currency: property,
          rate: ratesObj[property]['N']
        });

      }

      console.log(this.itemsArr);

      let startDateObj = new Date();
      startDateObj.setDate(startDateObj.getDate() - this.count);
      this.fromDateStr = startDateObj.getUTCFullYear() + "-" + (startDateObj.getUTCMonth() + 1) + "-" + startDateObj.getUTCDay();

      let endDateObj = new Date();
      this.toDateStr = endDateObj.getUTCFullYear() + "-" + (endDateObj.getUTCMonth() + 1) + "-" + endDateObj.getUTCDay();

      this.restApiService.getHistDataByCurrencyBase(this.baseCurrency, this.fromDateStr, this.toDateStr).subscribe((result: Object) => {
        result = Object.keys(result).sort().reduce(function (data, key) {
          data[key] = result[key];
          return data;
        }, {});
        if (this.datesArr.length > 0 && this.currencyRateData.length > 0) {
          this.datesArr = [];
          this.currencyRateData = [];
        }
        for (const date in result) {
          if (Object.prototype.hasOwnProperty.call(result, date)) {
            const element = result[date];

            this.datesArr.push(date);
            this.currencyRateData.push(result[date][this.baseCurrency][this.targetCurrency]);
          }
        }
      });
    });
  }
  onBaseKeyPress(event: any) {

    this.baseCurrencyAmount = event.target.value;
    this.targetCurrencyAmount = this.baseCurrencyAmount * this.conversionRate.target;
  }

  onTargetKeyPress(event: any) {
    this.targetCurrencyAmount = event.target.value;
    this.baseCurrencyAmount = this.targetCurrencyAmount * this.conversionRate.base;
  }
  changeTargetMenu(currency: string): void {
    this.targetCurrency = currency;
    this.baseCurrencyAmount = 1;
    this.restApiService.getDataByCurrencyBase(this.baseCurrency).subscribe((result: Object) => {
      const ratesObj = result['Item']['rates']['M'];

      this.dropDownArr = [];
      this.itemsArr = [];
      for (const property in ratesObj) {
        if (property === this.targetCurrency) {
          this.conversionRate.target = ratesObj[property]['N'];
          this.targetCurrencyAmount = ratesObj[property]['N'];
        }
        this.dropDownArr.push(property);
        this.itemsArr.push({
          currency: property,
          rate: ratesObj[property]['N']
        });

      }

      console.log(this.itemsArr);

      let startDateObj = new Date();
      startDateObj.setDate(startDateObj.getDate() - this.count);
      this.fromDateStr = startDateObj.getUTCFullYear() + "-" + (startDateObj.getUTCMonth() + 1) + "-" + startDateObj.getUTCDay();

      let endDateObj = new Date();
      this.toDateStr = endDateObj.getUTCFullYear() + "-" + (endDateObj.getUTCMonth() + 1) + "-" + endDateObj.getUTCDay();

      this.restApiService.getHistDataByCurrencyBase(this.baseCurrency, this.fromDateStr, this.toDateStr).subscribe((result: Object) => {
        result = Object.keys(result).sort().reduce(function (data, key) {
          data[key] = result[key];
          return data;
        }, {});
        if (this.datesArr.length > 0 && this.currencyRateData.length > 0) {
          this.datesArr = [];
          this.currencyRateData = [];
        }
        for (const date in result) {
          if (Object.prototype.hasOwnProperty.call(result, date)) {
            const element = result[date];

            this.datesArr.push(date);
            this.currencyRateData.push(result[date][this.baseCurrency][this.targetCurrency]);
          }
        }
      });
    });
  }

}
