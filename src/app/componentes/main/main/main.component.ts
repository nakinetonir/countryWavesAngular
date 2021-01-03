import { Component, OnInit, HostListener } from '@angular/core';
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
  totalDia
  datosMes
  fechaMes
  country
  datosPorMes
  meseString
  fechaDia
  movil: number = 320;
  table: number = 740;
  desktop: number = 980
  wide: number = 1300
  close: boolean = false;
  tamano = "35%"
  totalCasos;
  meses : string[]
  yearsTotal
  years
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(event.target.innerWidth);
    let sidebar = document.getElementById('sidebar')
    this.sizeScreen(event.target.innerWidth, sidebar)

  }
  constructor(private _ms: MainService) { }

  ngOnInit(): void {
      let sidebar = document.getElementById('sidebar')
      this.sizeScreen(window.innerWidth,sidebar)
  }

  selectCountry(event) {
    if (event) {
      this._ms.postDataCountry(event).subscribe(
        x => {
          this.datosTotal = JSON.parse(x["totalDatos"]).fechaTotal
          this.fechaTotal = JSON.parse(x["totalDatos"]).datosTotal
          this.yearsTotal = JSON.parse(x["totalDatos"]).yearsTotal
          this.datosMes = JSON.parse(x["totalMeses"]).datos
          this.fechaMes = JSON.parse(x["totalMeses"]).fecha
          this.meseString = JSON.parse(x["totalMeses"]).MesDate
          this.totalCasos = JSON.parse(x["totalCasos"]);
          this.years = JSON.parse(x["years"])
          this.totalDia = {
            totalDia : JSON.parse(x["totalDia"]),
            fechaDia:x["fechaDia"]
          }
          this.country = event
          let disntintos = this.disntintos(this.meseString)
          console.log(disntintos)
          this.datosProcessMes(this.datosMes, this.fechaMes, this.meseString)
          this.datosProcess(this.datosTotal, this.fechaTotal,this.yearsTotal)

        }
      )
    }

  }
  datosProcess(datosTotal, fechaTotal,yearsTotal) {
    let listadoDatos = []
    // tslint:disable-next-line: forin
    for (let i in datosTotal) {
      let arrayStgring: string[] = [];
      arrayStgring.push(datosTotal[i])
      arrayStgring.push(fechaTotal[i])
      arrayStgring.push(yearsTotal[i])
      listadoDatos.push(arrayStgring);
    }
    this.datos = listadoDatos
    this.countrySelected = true
    //this.getRefCountWord(array, this.componentRefBigramasTotal, this.chartOptionsListatodosbigrmTotal,this.compDynamicContainerBiTotal)

  }
  datosProcessMes(datos, fecha, meseString) {
    let listadoDatosTotal: String[][] = [];
    let listadoDatos = []
    let j = 0
    let mesAnterior
    let tamano = Object.keys(datos).length
    let mesesFor: string[] = []
    for (let i in datos) {
      let index = parseInt(i)
      if(index==0)
      {
        mesAnterior=meseString[index]
        mesesFor[j]=meseString[index]
      }
      if (mesAnterior!=meseString[index]) {
        listadoDatosTotal[j] = listadoDatos
        listadoDatos = []
        j = j + 1;
        mesesFor[j]=meseString[index]
      }

      mesAnterior=meseString[index]
      let arrayStgring: string[] = [];
      arrayStgring.push(fecha[index])
      arrayStgring.push(datos[index])
      listadoDatos.push(arrayStgring);
      if(index+1 == tamano)
      {
        listadoDatosTotal[j] = listadoDatos
      }

    }

    this.datosPorMes = listadoDatosTotal
    this.meses = mesesFor;
    //this.getRefCountWord(array, this.componentRefBigramasTotal, this.chartOptionsListatodosbigrmTotal,this.compDynamicContainerBiTotal)

  }
  onHide() {
    this.close = true;
  }
  sizeScreen(size, sidebar) {
    if (size <= this.movil) {
      this.tamano = "100%";

    }
    else if (size <= this.table) {
      this.tamano = "100%";

    }
    else if (size <= this.desktop) {
      this.tamano = "35%";

    }
    else if (size <= this.wide) {
      this.tamano = "35%";

    }
    else {
      this.tamano = "40%";
    }


  }
  disntintos(datos)
  {
    var distinct = []
    for (var i = 0; i < datos.length; i++)
    {
      if(distinct.filter(x=>x==datos[i])[0].length==0)
        {
          distinct.push(datos[i].age)
        }
    }
     return distinct

  }


}
