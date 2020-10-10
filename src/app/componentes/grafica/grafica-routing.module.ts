import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraficaComponent } from './grafica.component';


const routes: Routes = [
  {
    path: '',  component: GraficaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraficaRoutingModule { }
