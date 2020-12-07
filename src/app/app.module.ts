import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TableComponent } from './table/table.component';
import { CurrencyComponent } from './currency/currency.component';
import { QueryFilterPipe } from './query-filter.pipe';
import { LineChartComponent } from './line-chart/line-chart.component'
import { ChartsModule } from 'ng2-charts';
import { CurrrencyConversionComponent } from './currrency-conversion/currrency-conversion.component';
import { DummTableComponent } from './dumm-table/dumm-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    TableComponent,
    CurrencyComponent,
    QueryFilterPipe,
    LineChartComponent,
    CurrrencyConversionComponent,
    DummTableComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}