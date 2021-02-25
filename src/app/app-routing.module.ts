import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/countries', pathMatch: 'full' },
  { path: 'graficas', loadChildren: () => import('./componentes/grafica/grafica.module').then(m=> m.GraficaModule)
  },
  { path: 'formulario', loadChildren: () => import('./componentes/formulario/formulario.module').then(m=> m.FormularioModule)
  },
  { path: 'word-count', loadChildren: () => import('./componentes/word-count/word-count.module').then(m=> m.WordCountModule)
  },
  { path: 'countries', loadChildren: () => import('./componentes/main/main/main.module').then(m=> m.MainModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
