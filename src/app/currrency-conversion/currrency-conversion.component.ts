import { Component, OnInit } from '@angular/core';
import { CurrencyAPIService } from '../service/currencydata.service';

@Component({
  selector: 'app-currrency-conversion',
  templateUrl: './currrency-conversion.component.html',
  styleUrls: ['./currrency-conversion.component.css']
})
export class CurrrencyConversionComponent implements OnInit {
  [x: string]: any;

  currencyRateData: number[] = [];
  datesArr: string[] = [];

  count: number = 150;

  query: string = "";
  fromDateStr: string = "";
  toDateStr: string = "";

  baseCurrency: string = "USD";
  targetCurrency: string = "EUR";

  constructor(private restApiService: CurrencyAPIService) { }

  ngOnInit(): void {

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
  }

  changeMenu(currency: string): void { }

}
