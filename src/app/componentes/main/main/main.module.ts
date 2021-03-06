import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainService} from './main.service'
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { PlanetaModule } from './planeta/planeta.module'
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { GraficasModule} from './graficas/graficas.module'
import {ProgressSpinnerModule} from 'primeng/progressspinner';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    PlanetaModule,
    ButtonModule,
    SidebarModule,
    GraficasModule,
    ProgressSpinnerModule


  ],
  providers : [MainService]
})
export class MainModule { }
