import { Component, Input, OnInit } from '@angular/core';
import { CurrencyAPIService } from '../service/currencydata.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  @Input() itemsArr = [];

  constructor(private restApiService: CurrencyAPIService) { }

  ngOnInit() {
  }

}