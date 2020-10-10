import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordCountRoutingModule } from './word-count-routing.module';
import {RadioButtonModule} from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WordCountService } from './word-count.service'
import {WordCountComponent } from './word-count.component'
import { GraficasModule } from '../../comun/graficas/graficas.module';
import { GraficasComponent } from './graficas/graficas.component'
import {ProgressSpinnerModule} from 'primeng/progressspinner';


@NgModule({
  declarations: [WordCountComponent, GraficasComponent],
  imports: [
    CommonModule,
    WordCountRoutingModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    GraficasModule,
    ProgressSpinnerModule

  ],
  providers : [WordCountService],
  entryComponents: [GraficasComponent]
})
export class WordCountModule { }
