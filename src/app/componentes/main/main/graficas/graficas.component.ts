import { MesesInterface } from './../interface/meses-interface';
import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import * as Highcharts from 'highcharts';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);


@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss']
})
export class GraficasComponent implements OnInit {
  @Output() onDeSelectAll: EventEmitter<any> = new EventEmitter();
  dropdownSettings: IDropdownSettings = {}
  datosOk: boolean = false
  datosMesOk: boolean = false
  highcharts: typeof Highcharts = Highcharts;
  meses
  mesesArray
  options = []
  mostrarAno: boolean = true;
  mostrarMes: boolean = false;
  mostrarBotoMes: boolean = false;
  totalDeCasos
  totalPorDia
  fechaDiaDato
  totalDiaDato
  selectYears = "2020"
  yearsInput = []
  datosInput
  mesFilter
  mesesSelect
  datosPorMesInput
  filtros = []
  mesesOk: boolean = false
  @Input() set datos(datos) {
    if (datos) {
      this.datosInput = datos
      this.putData()
      this.mostrarAno = true;
      this.mostrarMes = false;
      this.datosOk = true;
    }
  }
  get datos() {
    return this.datos;
  }

  @Input() set totalDia(total) {
    if (total) {
      this.totalPorDia = total
      this.totalDiaDato = this.totalPorDia.totalDia
      this.fechaDiaDato = this.totalPorDia.fechaDia
    }
  }

  get totalDia() {
    return this.totalDia
  }

  @Input() set datosPorMes(datosPorMes) {
    if (datosPorMes) {
      this.datosPorMesInput = datosPorMes
      let mesesFilterYear = this.datosPorMesInput.filter(x => x.year == this.selectYears)
      this.mesesSelect = Array.from(new Set(mesesFilterYear.map(x => {
        return x.MesDate;
      })))
      if (this.mesesSelect)
        this.mesesOk = true


      this.mostrarBotoMes = true;


      this.meses = datosPorMes
      //this.chartOptions.series[0].data = datos;
      //this.datosOk = true;
    }
  }
  get datosPorMes() {
    return this.datosPorMes;
  }

  @Input() set close(close) {
    if (close) {
      this.mostrarAno = true;
      this.mostrarMes = false;
    }
  }
  get years() {
    return this.yearsInput;
  }

  @Input() set years(years) {
    if (years) {
      this.yearsInput = years
    }
  }
  get close() {
    return this.close;
  }



  @Input() set totalCasos(totalCasos) {
    if (totalCasos) {
      this.totalDeCasos = totalCasos
      this.chartOptions.title.text = "El total de casos actualizado: " + this.totalDeCasos
    }
  }
  get totalCasos() {
    return this.totalDeCasos;
  }

  chartOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: ''
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total de Casos'
      },
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Casos Covic'
    },
    series: [{
      name: 'Casos',
      data: [],
      dataLabels: {
        enabled: true,
        rotation: -90,
        color: '#FFFFFF',
        align: 'right',
        format: '{point.y}', // one decimal
        y: 10, // 10 pixels down from the top
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    }]
  };
  constructor() { }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 0
    };

  }
  getOptions() {
    let chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        type: 'category',
        labels: {
          rotation: -45,
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Total de Casos'
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        pointFormat: 'Casos Covic'
      },
      series: [{
        name: 'Casos',
        data: [],
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: '{point.y}', // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      }]
    };
    return chartOptions;
  }
  mostrar(mostrar) {
    if (mostrar == "mes") {
      this.mostrarMes = true;
      this.mostrarAno = false;
    }
    else {
      this.mostrarAno = true;
      this.mostrarMes = false;
    }
  }
  putData() {
    this.filtros = []
    this.onDeSelectAll.next(null)
    let datos = this.datosInput.filter(x => x[2] == this.selectYears)
    if (this.datosPorMesInput) {
      let mesesFilterYear = this.datosPorMesInput.filter(x => x.year == this.selectYears)
      this.mesesSelect = Array.from(new Set(mesesFilterYear.map(x => {
        return x.MesDate;
      })))
    }

    datos = datos.map((x) => {
      let r = []
      r.push(x[0])
      r.push(x[1])
      return r
    })
    this.chartOptions.series[0].data = datos;
    this.datosOk = true;
  }
  /*getMonth(event)
  {
    let datos  = this.datosPorMesInput.filter(x=>x.MesDate == event && x.year == this.selectYears)
    this.filterMonth(datos)

  }*/
  getMonth(event, accion) {
    if (accion) {
      var index = this.filtros.indexOf(event);
      if (index == -1) {
        this.filtros.push(event)
      }

    }
    else {
      var index = this.filtros.indexOf(event);
      if (index > -1) {
        this.filtros.splice(index, 1);
      }
    }
    let datos: MesesInterface[] = [];
    let count = 0
    if (this.filtros) {
      for (let filtre of this.filtros) {
        this.filterMonth(this.datosPorMesInput.filter(x => x.MesDate == filtre && x.year == this.selectYears), count,filtre)
        count = count + 1;
      }
    }



  }
  filterMonth(datos, count , month) {

    datos = datos.sort((a, b) => {
      return <any>new Date(a.Fecha) - <any>new Date(b.Fecha);
    });
    let data = datos.map((x) => {
      let r = []
      r.push(x.Fecha)
      r.push(x.numberDay)
      return r
    })
    let optionCount = this.getOptions()
    optionCount.series[0].data = data;
    optionCount.title.text = month
    this.options[count] = optionCount
    this.datosMesOk = true;
  }
  onDeSelectAllFunct($event)
  {

  }
}
