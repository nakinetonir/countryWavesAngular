import { FormularioService } from './formulario.service';
import { FormularioComponent } from './formulario.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { MatFormFieldModule, MatSelectModule, MatSnackBarModule } from '@angular/material';
import { FormularioRoutingModule } from './formulario-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormularioComponent],
  imports: [
    CommonModule,
    FormularioRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    //MatSelectModule,
    //MatFormFieldModule,

  ],
  providers : [
    FormularioService
  ]
})
export class FormularioModule { }
