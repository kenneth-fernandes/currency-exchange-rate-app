import { Component, OnInit } from '@angular/core';
import { CurrencyAPIService } from '../service/currencydata.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
  itemsArr = [];
  dropDownArr = [];
  baseCurrency: string;
  query: string = "";


  constructor(private restApiService: CurrencyAPIService) { }


  ngOnInit(): void {
    this.restApiService.getData().subscribe((result: Object) => {
      console.log(result);
      const ratesObj = result['rates'];
      this.baseCurrency = result['base'];
      for (const property in ratesObj) {
        this.dropDownArr.push(property);
        this.itemsArr.push({
          currency: property,
          rate: ratesObj[property]
        });
      }
      console.log(ratesObj);
    });
  }

  changeMenu(currency: string): void {
    this.itemsArr = [];
    this.dropDownArr = [];
    console.log(currency);
    this.restApiService.getDataByCurrencyBase(currency).subscribe((result: Object) => {
      console.log(result);
      const ratesObj = result['rates'];
      this.baseCurrency = result['base'];
      for (const property in ratesObj) {
        this.dropDownArr.push(property);
        this.itemsArr.push({
          currency: property,
          rate: ratesObj[property]
        });
      }
      console.log(ratesObj);
      this.query = "";
    });
  }
}




