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
  datosMes
  fechaMes
  country
  datosPorMes
  movil: number = 320;
  table: number = 740;
  desktop: number = 980
  wide: number = 1300
  close: boolean = false;
  tamano = "35%"
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
          this.datosMes = JSON.parse(x["totalMeses"]).datos
          this.fechaMes = JSON.parse(x["totalMeses"]).fecha
          this.country = event
          this.datosProcessMes(this.datosMes, this.fechaMes)
          this.datosProcess(this.datosTotal, this.fechaTotal)

        }
      )
    }

  }
  datosProcess(datosTotal, fechaTotal) {
    let listadoDatos = []
    // tslint:disable-next-line: forin
    for (let i in datosTotal) {
      let arrayStgring: string[] = [];
      arrayStgring.push(datosTotal[i])
      arrayStgring.push(fechaTotal[i])
      listadoDatos.push(arrayStgring);
    }
    this.datos = listadoDatos
    this.countrySelected = true
    //this.getRefCountWord(array, this.componentRefBigramasTotal, this.chartOptionsListatodosbigrmTotal,this.compDynamicContainerBiTotal)

  }
  datosProcessMes(datos, fecha) {
    let listadoDatosTotal: String[][] = [];
    let listadoDatos = []
    let j = 0
    let tamano = Object.keys(datos).length
    // tslint:disable-next-line: forin
    for (let i in datos) {
      if (parseInt(i) % 30 == 0 && parseInt(i) != 0) {
        listadoDatosTotal[j] = listadoDatos
        listadoDatos = []
        j = j + 1;
      }

      let arrayStgring: string[] = [];
      arrayStgring.push(fecha[i])
      arrayStgring.push(datos[i])
      listadoDatos.push(arrayStgring);

      if (parseInt(i) == tamano - 1) {
        listadoDatosTotal[j] = listadoDatos
      }
    }

    this.datosPorMes = listadoDatosTotal
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

}
