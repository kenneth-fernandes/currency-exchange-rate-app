import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class CurrencyAPIService {

  private api = "https://api.exchangeratesapi.io";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getData(): Observable<Object> {
    return this.httpClient.get<Object>(this.api + '/latest');
  }

  getDataByCurrencyBase(baseCUrrency: string): Observable<Object> {
    return this.httpClient.get<Object>(this.api + '/latest?base=' + baseCUrrency);
  }

}