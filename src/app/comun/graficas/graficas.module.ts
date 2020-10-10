import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartComponent } from 'highcharts-angular'
import { HighchartsChartModule } from 'highcharts-angular';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HighchartsChartModule
  ],
  exports: [HighchartsChartComponent]
})
export class GraficasModule { }
