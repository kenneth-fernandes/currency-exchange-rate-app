import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class CurrencyAPIService {

  private api = "https://api.exchangeratesapi.io";
  private awsCurrencyApi = "https://m0xf3a11qg.execute-api.us-west-2.amazonaws.com";
  private awsCryptoApi = "https://mggua01lo3.execute-api.us-west-2.amazonaws.com";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getData(): Observable<Object> {
    return this.httpClient.get<Object>(this.api + '/latest');
  }

  getDataByCurrencyBase(baseCurrency: string): Observable<Object> {
    return this.httpClient.get<Object>(this.awsCurrencyApi + '/prod/currency?base=' + baseCurrency);
  }

  getDataByCurrencyBaseAndDate(baseCUrrency: string, requestedCurrency: string, dateStr: string): Observable<Object> {
    return this.httpClient.get<Object>(this.api + '/' + dateStr + '?base=' + baseCUrrency + '&symbols=' + requestedCurrency);
  }

  getHistDataByCurrencyBase(baseCurrency: string, startDate: string, endDate: string): Observable<Object> {
    console.log(this.awsCurrencyApi + '/prod/currencyhistory?start_date=' + startDate + '&end_date=' + endDate + '&base=' + baseCurrency);
    return this.httpClient.get<Object>(this.awsCurrencyApi + '/prod/currencyhistory?start_date=' + startDate + '&end_date=' + endDate + '&base=' + baseCurrency);
  }

  getHistData(startDate: string, endDate: string): Observable<Object> {
    return this.httpClient.get<Object>(this.awsCurrencyApi + '/prod/currencyhistory?start_date=' + startDate + '&end_date=' + endDate);
  }

  getCryptoData(base: string) {
    return this.httpClient.get<Object>(this.awsCryptoApi + '/prod/cryptocurrency?Target=' + base);
  }


}