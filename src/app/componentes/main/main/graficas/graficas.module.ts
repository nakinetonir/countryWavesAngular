import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { GraficasComponent } from './graficas.component';


@NgModule({
  declarations: [GraficasComponent],
  imports: [
    CommonModule,
    HighchartsChartModule
  ],
  exports : [GraficasComponent]
})
export class GraficasModule { }
