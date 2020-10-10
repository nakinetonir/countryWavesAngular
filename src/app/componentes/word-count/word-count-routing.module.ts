import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WordCountComponent } from './word-count.component'

const routes: Routes = [
  {
    path: '',  component: WordCountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WordCountRoutingModule { }
