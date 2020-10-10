import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanetaComponent } from './planeta.component';
import { HighchartsChartComponent } from 'highcharts-angular'
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [PlanetaComponent],
  imports: [
    CommonModule,
    HighchartsChartModule
  ],
  exports : [PlanetaComponent]
})
export class PlanetaModule { }
