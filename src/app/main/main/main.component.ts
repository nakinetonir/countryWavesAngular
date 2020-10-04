import { Component, OnInit } from '@angular/core';
import { MainService } from './main.service'


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
 
  datos
  countrySelected: boolean = false;
  datosTotal
  fechaTotal
  datosMes 
  fechaMes 
  country
  datosPorMes
  close : boolean = false;
  constructor(private _ms : MainService) { }

  ngOnInit(): void {
      
  }

  selectCountry(event)
  {
    if(event)
    {
      this._ms.postDataCountry(event).subscribe(
        x=> {
           this.datosTotal = JSON.parse(x["totalDatos"]).fechaTotal
           this.fechaTotal = JSON.parse(x["totalDatos"]).datosTotal
           this.datosMes = JSON.parse(x["totalMeses"]).datos
           this.fechaMes = JSON.parse(x["totalMeses"]).fecha
           this.country = event
           this.datosProcessMes(this.datosMes,this.fechaMes)
           this.datosProcess(this.datosTotal,this.fechaTotal)
           
        }
     )
    }
    
  }
  datosProcess(datosTotal,fechaTotal)
  {
    let listadoDatos = []
    // tslint:disable-next-line: forin
    for (let i in datosTotal)
    {
        let arrayStgring : string[] = [];
        arrayStgring.push(datosTotal[i])
        arrayStgring.push(fechaTotal[i])
        listadoDatos.push(arrayStgring);
    }
    this.datos = listadoDatos
    this.countrySelected = true
    //this.getRefCountWord(array, this.componentRefBigramasTotal, this.chartOptionsListatodosbigrmTotal,this.compDynamicContainerBiTotal)

  }
  datosProcessMes(datos,fecha)
  {
    let listadoDatosTotal : String[][] = [];
    let listadoDatos = []
    let j = 0
    let tamano = Object.keys(datos).length
    // tslint:disable-next-line: forin
    for (let i in datos)
    {
        if(parseInt(i)%30==0 && parseInt(i)!=0)
        {
          listadoDatosTotal[j]= listadoDatos
          listadoDatos = []
          j = j+1;
        }
        
        let arrayStgring : string[] = [];
        arrayStgring.push(fecha[i])
        arrayStgring.push(datos[i])
        listadoDatos.push(arrayStgring);
        
        if(parseInt(i) == tamano -1)
        {
          listadoDatosTotal[j]= listadoDatos
        }
    }
    
    this.datosPorMes = listadoDatosTotal
    //this.getRefCountWord(array, this.componentRefBigramasTotal, this.chartOptionsListatodosbigrmTotal,this.compDynamicContainerBiTotal)

  }
  onHide()
  {
    this.close = true;
  }

}
