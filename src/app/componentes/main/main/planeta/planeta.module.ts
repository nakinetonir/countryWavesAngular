import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlanetaComponent } from './planeta.component';
import { HighchartsChartComponent } from 'highcharts-angular'
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [PlanetaComponent],
  imports: [
    CommonModule,
    HighchartsChartModule,
    FormsModule
  ],
  exports : [PlanetaComponent]
})
export class PlanetaModule { }
