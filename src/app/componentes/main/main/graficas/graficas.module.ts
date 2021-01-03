import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { GraficasComponent } from './graficas.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [GraficasComponent],
  imports: [
    CommonModule,
    HighchartsChartModule,
    FormsModule
  ],
  exports : [GraficasComponent]
})
export class GraficasModule { }
