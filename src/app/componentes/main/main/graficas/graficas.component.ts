import { MesesInterface } from './../interface/meses-interface';
import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import * as Highcharts from 'highcharts';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ListadoMounth } from '../enumerables/mounth'
import { MainService } from '../main.service'


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

  @Output() onDropdownChange: EventEmitter<any> = new EventEmitter();
  dropdownSettings: IDropdownSettings = {}
  dropdownSettingsYears: IDropdownSettings = {}
  datosOk: boolean = false
  desktopBoolean: boolean = false
  datosMesOk: boolean = false
  highcharts: typeof Highcharts = Highcharts;
  meses
  mesesArray
  optionsMonth = []
  optionsYear = []
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
  yearFilter
  mesesSelect
  datosPorMesInput
  filtrosMonth = []
  filtrosYears = []
  enableCheckAll: boolean = true
  mesesOk: boolean = false
  mesesSort
  movil: number = 320;
  table: number = 740;
  desktop: number = 980
  wide: number = 1300
  tamano = "100%"
  mounthYears = []
  incidenciaInput
  datosYearOk: boolean = false
  @Input() set datos(datos) {
    if (datos) {
      this.datosInput = datos
      this.yearFilter = [2021]
      this.getYear(2021, true)
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
      let mesesFilterYear = this.datosPorMesInput.filter(x => this.yearFilter.indexOf(parseInt(x.year)) > -1)
      this.mesesSelect = Array.from(new Set(mesesFilterYear.map(x => {
        return x.MesDate + ' - ' + x.year;
      })))
      this.sortMounth()
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

  @Input() set incidencia(value) {
    if (value) {
      this.incidenciaInput = Math.trunc(parseInt(value))
    }
  }
  get incidencia() {
    return this.incidenciaInput;
  }

  @Input()

  @Input() set years(years) {
    if (years) {
      this.yearsInput = years
      this.sortMounth()

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
  constructor(private _ms: MainService) { }

  ngOnInit(): void {

    this.mesFilter = []
    this.yearFilter = []
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 0
    };
    this.dropdownSettingsYears = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All'
    };
    this._ms.getSizeScreen().subscribe(
      x => {
        let element = document.getElementById("top")
        if (element)
          this.sizeScreen(x, element)

      }
    )

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
    this.mesFilter = []
    this.filtrosMonth = []
    let datos = this.datosInput.filter(x => x[2] == this.selectYears)
    if (this.datosPorMesInput) {
      let mesesFilterYear = this.datosPorMesInput.filter(x => x.year == this.selectYears)
      this.mesesSelect = Array.from(new Set(mesesFilterYear.map(x => {
        return x.MesDate;
      })))

    }



    this.sortMounth()
    this.chartOptions.series[0].data = datos;
    this.datosOk = true;
  }
  /*getMonth(event)
  {
    let datos  = this.datosPorMesInput.filter(x=>x.MesDate == event && x.year == this.selectYears)
    this.filterMonth(datos)

  }*/

  getYear(event, accion) {
    console.log(this.yearFilter)
    if (accion) {
      var index = this.filtrosYears.indexOf(event);
      if (index == -1) {
        this.filtrosYears.push(event)
      }

    }
    else {
      var index = this.filtrosYears.indexOf(event);
      if (index > -1) {
        this.filtrosYears.splice(index, 1);
      }
    }
    let count = 0
    this.mesesSelect = []
    if (this.filtrosYears) {
      for (let filtro of this.filtrosYears) {
        this.filterYears(this.datosInput.filter(x => x[2] == filtro), count, filtro)
        count = count + 1;
        if (this.datosPorMesInput) {
          let mesesFilterYear = this.datosPorMesInput.filter(x => x.year == filtro)
          if(this.mesesSelect.length>0)
          {
            this.mesesSelect = [...this.mesesSelect, ...Array.from(new Set(mesesFilterYear.map(x => {
              return x.MesDate + ' - ' + x.year;
            })))]
          }
          else
          {
            this.mesesSelect = Array.from(new Set(mesesFilterYear.map(x => {
              return x.MesDate + ' - ' + x.year;
            })))
          }

        }
        this.sortMounth()
      }
    }

    /**
     *  this.mesFilter = []
        this.filtrosMonth = []
        let datos =


     */

  }

  getMonth(event, accion) {
    if (accion) {
      var index = this.filtrosMonth.indexOf(event);
      if (index == -1) {
        this.filtrosMonth.push(event)
      }

    }
    else {
      var index = this.filtrosMonth.indexOf(event);
      if (index > -1) {
        this.filtrosMonth.splice(index, 1);
      }
    }
    let count = 0
    if (this.filtrosMonth) {
      for (let filtro of this.filtrosMonth) {
        this.filterMonth(this.datosPorMesInput.filter(x =>  x.MesDate + ' - ' + x.year == filtro), count, filtro)
        count = count + 1;
      }
    }



  }
  filterMonth(datos, count, month) {

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
    this.optionsMonth[count] = optionCount
    this.datosMesOk = true;
  }

  filterYears(datos, count, year) {

    datos = datos.sort((a, b) => {
      return <any>new Date(a.Fecha) - <any>new Date(b.Fecha);
    });
    datos = datos.map((x) => {
      let r = []
      r.push(x[0])
      r.push(x[1])
      return r
    })
    let optionCount = this.getOptions()
    optionCount.series[0].data = datos;
    optionCount.title.text = year
    this.optionsYear[count] = optionCount
    this.datosYearOk = true;
  }
  onDeSelectAllMonthFunct($event) {
    this.filtrosMonth = []
  }

  onSelectAllMonthFunct($event) {

    let count = 0
    for (let filtro of this.mesesSort) {
      this.filterMonth(this.datosPorMesInput.filter(x => x.MesDate + ' - ' + x.year == filtro), count, filtro)
      var index = this.filtrosMonth.indexOf(filtro);
      if (index == -1) {
        this.filtrosMonth.push(filtro)
      }
      count = count + 1;
    }


  }
  onDeSelectAllYearFunct($event) {
    this.filtrosYears = []
  }

  onSelectAllYearFunct($event) {

    let count = 0
    for (let filtro of this.yearsInput) {
      this.filterYears(this.datosInput.filter(x => x.year == filtro), count, filtro)
      var index = this.filtrosYears.indexOf(filtro);
      if (index == -1) {
        this.filtrosYears.push(filtro)
      }
      count = count + 1;
    }


  }

  mounthYearsFunct() {
    let mounthYears = []
    for (let mounth of ListadoMounth) {
      for (let year of this.yearsInput) {
          let mounthYear = mounth + ' - ' + year
          mounthYears.push(mounthYear)
      }
    }
    this.mounthYears = mounthYears
  }
  sortMounth() {
    if (this.mesesSelect && this.yearsInput) {
      this.mounthYearsFunct()
      let mesesSort = Array.apply(null, Array(this.mesesSelect.length)).map(function () { })
      for (let mounth of this.mesesSelect) {
        console.log(mounth)
        var index = this.mounthYears.indexOf(mounth);
        mesesSort[index] = mounth
      }
      let indices = mesesSort.reduce(function (r, v, i) {
        return r.concat(v === undefined ? i : []);
      }, []);
      mesesSort = mesesSort.filter(function (value, index) {
        return indices.indexOf(index) == -1;
      })

      this.mesesSort = mesesSort
    }

  }

  sizeScreen(size, element) {
    if (size <= this.movil) {
      element.classList.remove("positionCenter")
      this.desktopBoolean = false
    }
    else if (size <= this.table) {
      this.desktopBoolean = false
      element.classList.remove("positionCenter")
    }
    else if (size <= this.desktop) {
      this.desktopBoolean = true
      element.classList.add("positionCenter")

    }
    else if (size <= this.wide) {
      this.desktopBoolean = true
      element.classList.add("positionCenter")

    }
    else {
      this.desktopBoolean = true
      element.classList.add("positionCenter")
    }


  }
}
