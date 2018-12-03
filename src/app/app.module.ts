import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {GridsterModule} from 'angular-gridster2';
import { DynamicWidgetsComponent } from './dynamicWidgets/dynamicWidgets.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { AllChartsComponent } from './all-charts/all-charts.component';
import { LineChartComponent } from './line-chart/line-chart.component';
// import {MatIconModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,DynamicWidgetsComponent, PieChartComponent, AllChartsComponent, LineChartComponent
  ],
  imports: [
    BrowserModule,
    GridsterModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
