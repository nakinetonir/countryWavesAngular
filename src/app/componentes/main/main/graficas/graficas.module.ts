import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { GraficasComponent } from './graficas.component';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [GraficasComponent],
  imports: [
    CommonModule,
    HighchartsChartModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports : [GraficasComponent]
})
export class GraficasModule { }
