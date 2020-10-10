import { Component, OnInit,  ViewChild, Renderer2, ElementRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { getPrediccion,getVariables } from './store/actions';
import { FormControl, FormGroup, FormGroupName } from '@angular/forms';
import { IFormulario } from './interface/formulario_interface';
import { ISelect } from './interface/select_interface'

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  pre = 0
  prediccionGroup : FormGroup;
  formularios: IFormulario[] = [];
  casaGroup : FormGroup = null;
  cargadoFormulario : Boolean = false
  @ViewChild('prediccion') prediccionInput: ElementRef;

  constructor(private store: Store<any>, private renderer2 : Renderer2) {

  }

  ngOnInit() {
    this.store.dispatch( getVariables() );

    this.prediccionGroup= new FormGroup(
      {
        prediccion: new FormControl(''),
      }
    );
    this.store.subscribe( state => {
      if(state.formulario.variables!=null)
      {
          //Carga las distintas variables para contruir el formulario dinamico.
          if(this.formularios.length==0)
          {
            let label = state.formulario.variables.variables.label;
            let tipos = state.formulario.variables.variables.tipos
            let category = state.formulario.variables.variables.category
            let keysCategory = Object.keys(category)
            for (let [ campo,tipo ] of Object.entries(tipos))
          {
             let categoryFormularioNumero = (keysCategory.includes(campo)) ? category[campo]["numerico"] : "";
             let categoryFormularioText = (keysCategory.includes(campo)) ? category[campo]["texto"] : "";
             let categoryArray: ISelect[]=[]
             if(categoryFormularioNumero!="")
             {
                for (let i = 0; i<categoryFormularioNumero.length; i++)
                {
                let select : ISelect = {
                  label: categoryFormularioText[i],
                  value: categoryFormularioNumero[i]
                  }
                  categoryArray.push(select)
                }
             }


              let formulario : IFormulario = {
                tipo : tipo.toString(),
                label:  label[campo],
                campo : campo,
                // tslint:disable-next-line: no-trailing-whitespace
                category : categoryArray
              }
              this.formularios.push(formulario);



          }
            this.crateFormulario();
          }

      }

      if(state.formulario.prediccion != null)
      {
        //muestra la prediccion en el frontal
        this.pre = state.formulario.prediccion[0];


      }
  });

  }
  enviarDatos()
  {
    //Envio de los datos con ngrx para recibir la prediccion
    let datos = this.casaGroup.value;
    this.store.dispatch( getPrediccion({ datos }) );
  }
//Creacion del formulario dinamico
  crateFormulario()
  {
    const grupo= {};
    this.formularios.forEach(formulario=>{
        grupo[formulario.campo]= new FormControl('');
    });

    this.casaGroup = new FormGroup(
      grupo
    );
    this.cargadoFormulario = true;
  }
//Genera las veces que se va a generar de tres en tres input el formjulario
  cargarFormulariosIndex()
  {
      let paresFormulariosIndex = []
      for(let i = 0; i<this.formularios.length;i=i+3)
      {
          paresFormulariosIndex.push(i)
      }
      return paresFormulariosIndex;
  }
}
