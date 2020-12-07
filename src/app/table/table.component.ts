import { Component, Input, OnInit } from '@angular/core';
import { CurrencyAPIService } from '../service/currencydata.service';
import { CurrencyFlagsService } from '../service/currenc-flags/currency-flags.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  @Input() itemsArr = [];

  service: CurrencyFlagsService;
  constructor(private restApiService: CurrencyAPIService, private serviceIn: CurrencyFlagsService) {
    this.service = serviceIn;

  }

  ngOnInit() {

  }

}