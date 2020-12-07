import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrrencyConversionComponent } from './currrency-conversion/currrency-conversion.component';

import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'currency/conversion', component: CurrrencyConversionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }