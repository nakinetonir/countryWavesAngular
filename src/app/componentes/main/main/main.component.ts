import { Component, OnInit, HostListener } from '@angular/core';
import { MainService } from './main.service'
import { MesesInterface } from './interface/meses-interface'
import { GraficaInterface} from './interface/grafica-interface'
import { PrediccionesInterface } from './interface/predicciones-interface'
import { DataSource } from '@angular/cdk/collections';


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
  fechaNumeroTotal
  movil: number = 320;
  table: number = 740;
  desktop: number = 980
  wide: number = 1300
  close: boolean = false;
  tamano = "35%"
  totalCasos;
  meses : string[]
  yearsTotal
  yearsMes
  mesesInterface : MesesInterface[] = []
  incidenciaInCountries
  incidenciaInCountriesCodes
  incidenciaInCountriesCountry
  codesIncidence
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let sidebar = document.getElementById('sidebar')
    this.sizeScreen(event.target.innerWidth, sidebar)
    this._ms.setSizeScreen(window.innerWidth)

  }
  constructor(private _ms: MainService) { }

  ngOnInit(): void {
      let sidebar = document.getElementById('sidebar')
      this.sizeScreen(window.innerWidth,sidebar)
      this._ms.setSizeScreen(window.innerWidth)
      this.getIncidenciaInCountries()
  }

  getIncidenciaInCountries()
  {
        this._ms.getIncidenciaInCountries().subscribe(
            x=> {
                if(x)
                {
                  this.incidenciaInCountries = JSON.parse(x["incidenciaInCountries"])
                  this.incidenciaInCountriesCodes = this.incidenciaInCountries.Code
                  this.incidenciaInCountriesCountry = this.incidenciaInCountries.incidencia
                  this.codesProcess(this.incidenciaInCountriesCodes,this.incidenciaInCountriesCountry)
                }
            }
        )
  }

  selectCountry(event) {
    if (event) {
      this._ms.postDataCountry(event).subscribe(
        x => {
          this.datosTotal = JSON.parse(x["totalDatos"]).datosTotal
          this.fechaTotal = JSON.parse(x["totalDatos"]).fechaTotal
          this.yearsTotal = JSON.parse(x["totalDatos"]).yearsTotal
          this.fechaNumeroTotal = JSON.parse(x["totalDatos"]).fechaNumeroTotal
          this.datosMes = JSON.parse(x["totalMeses"]).numberDay
          this.fechaMes = JSON.parse(x["totalMeses"]).Fecha
          this.yearsMes = JSON.parse(x["totalMeses"]).year
          this.meseString = JSON.parse(x["totalMeses"]).MesDate
          this.country = event
          let graficaObjet: GraficaInterface = {
              years: JSON.parse(x["years"]),
              incidencia: JSON.parse(x["incidencia"]),
              totalCasos : JSON.parse(x["totalCasos"]),
              totalDia : {
                totalDia : JSON.parse(x["totalDia"]),
                fechaDia:x["fechaDia"]
              },
              datosPorMes: this.datosProcessMes(JSON.parse(x["totalMeses"])),
              datos: this.datosProcess(this.datosTotal, this.fechaTotal, this.fechaNumeroTotal, this.yearsTotal),
              predicciones: this.datosPredicciones(JSON.parse(x["predictions"])),

          }
          this._ms.setGraficaObject(graficaObjet)





        }
      )
    }

  }

  datosProcess(datosTotal, fechaTotal,fechaNumeroTotal, yearsTotal) {
    let listadoDatos = []
    // tslint:disable-next-line: forin
    for (let i in datosTotal) {
      let arrayString: string[] = [];
      arrayString.push(fechaTotal[i])
      arrayString.push(datosTotal[i])
      arrayString.push(yearsTotal[i])
      arrayString.push(fechaNumeroTotal[i])
      listadoDatos.push(arrayString);
    }
    listadoDatos = listadoDatos.sort(this.compare)
    this.countrySelected = true
    return listadoDatos
    //this.getRefCountWord(array, this.componentRefBigramasTotal, this.chartOptionsListatodosbigrmTotal,this.compDynamicContainerBiTotal)

  }
  datosProcessMes(datos) {
    let meses : MesesInterface[] = []
    for (let i in datos.Fecha) {
        let diaInterface : MesesInterface =
        {
          Fecha : datos.Fecha[i],
          variable : datos.variable[i],
          year : datos.year[i],
          numberDay : datos.numberDay[i],
          MesDate : datos.MesDate[i]
        }
        meses.push(diaInterface)

    }

    return meses;
    //this.getRefCountWord(array, this.componentRefBigramasTotal, this.chartOptionsListatodosbigrmTotal,this.compDynamicContainerBiTotal)

  }
  datosPredicciones(datos) {
    let predicciones : PrediccionesInterface[] = []
    for (let i in datos.cases) {
        let prediccion : PrediccionesInterface =
        {
          casos: Math.trunc(parseInt(datos.cases[i])),
          fecha : datos.fecha[i],
          fechaNumber: datos.fechaNumber[i],
          stringMes: datos.stringMes[i]

        }
        predicciones.push(prediccion)

    }

    return predicciones;
    //this.getRefCountWord(array, this.componentRefBigramasTotal, this.chartOptionsListatodosbigrmTotal,this.compDynamicContainerBiTotal)

  }
  codesProcess(codes,countries)
  {
    let listadoCodes = []
    // tslint:disable-next-line: forin
    for (let i in codes) {
      let arrayString: any[] = [];
      arrayString.push(codes[i])
      arrayString.push(Math.round(parseInt(countries[i])))
      listadoCodes.push(arrayString)
    }
    this.codesIncidence = listadoCodes
  }

  compare( a, b ) {
    let numerOne = parseInt(a[3])
    let numberTwo = parseInt(b[3])
    if ( numerOne < numberTwo ){
      return -1;
    }
    if ( numerOne > numberTwo ){
      return 1;
    }
    return 0;
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
    this.tamano = "45%";

  }
  else if (size <= this.wide) {
    this.tamano = "45%";

  }
  else {
    this.tamano = "50%";
  }


}
}
