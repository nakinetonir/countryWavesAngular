import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficaComponent } from './grafica.component';
import { GraficaRoutingModule } from './grafica-routing.module';
import {RadioButtonModule} from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraficaService } from './grafica.service'
import { GraficasModule } from '../../comun/graficas/graficas.module'
@NgModule({
  declarations: [GraficaComponent],
  imports: [
    CommonModule,
    GraficaRoutingModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    GraficasModule
  ],
  providers : [
    GraficaService
  ]
})
export class GraficaModule { }
