import { Component, Input, OnChanges, OnInit, SimpleChanges, } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { CurrencyAPIService } from '../service/currencydata.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input() currencyRateData: number[] = [];
  @Input() datesArr: string[] = [];
  @Input() targetCurrency: string;
  dateObj: Date = new Date();
  dateStr: string;


  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartColors: Color[];
  lineChartOptions: Object;
  lineChartLegend: boolean;
  lineChartPlugins: any[];
  lineChartType: string;

  constructor(private restApiService: CurrencyAPIService) {
    this.dateStr = "";
    this.datesArr = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.lineChartData = [
      { data: this.currencyRateData, label: 'Target Currency : ' + this.targetCurrency },
    ];
    this.lineChartLabels = this.datesArr;


    this.lineChartOptions = {
      responsive: true,
    };

    this.lineChartColors = [
      {
        backgroundColor: 'rgba(105, 0, 132, .2)',
        borderColor: 'rgba(200, 99, 132, .7)',
        borderWidth: 2,
      },
    ];

    this.lineChartLegend = true;
    this.lineChartPlugins = [];
    this.lineChartType = 'line';

  }

  ngOnInit(): void {
    this.lineChartData = [
      { data: this.currencyRateData, label: 'Target Currency : ' + this.targetCurrency },
    ];
    this.lineChartLabels = this.datesArr;


    this.lineChartOptions = {
      responsive: true,
    };

    this.lineChartColors = [
      {
        backgroundColor: 'rgba(105, 0, 132, .2)',
        borderColor: 'rgba(200, 99, 132, .7)',
        borderWidth: 2,
      },
    ];

    this.lineChartLegend = true;
    this.lineChartPlugins = [];
    this.lineChartType = 'line';


  }

}
