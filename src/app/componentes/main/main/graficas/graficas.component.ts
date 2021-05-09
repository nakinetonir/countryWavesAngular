import { MesesInterface } from './../interface/meses-interface';
import { Component, OnInit, Input, Output, EventEmitter, HostListener, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ListadoMounth } from '../enumerables/mounth'
import { MainService } from '../main.service'
import { GraficaInterface } from '../interface/grafica-interface'
import { ThrowStmt } from '@angular/compiler';

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
export class GraficasComponent implements OnInit, AfterContentInit {

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
  buttonMonths: boolean = false
  incidenciaInput
  datosYearOk: boolean = false


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
  constructor(private _ms: MainService, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this._ms.getGraficaObject().subscribe(
      x => {
        if(x)
        {
          this.mesFilter = []
          this.yearFilter = []
          this.optionsMonth = []
          this.optionsYear = []
          this.filtrosMonth= []
          this.filtrosYears = []
          this.totalDeCasos = x.totalCasos
          this.chartOptions.title.text = "The total of cases updated: " + this.totalDeCasos
          this.yearsInput = x.years
          this.incidenciaInput = Math.trunc(parseInt(x.incidencia))
          this.datosPorMesInput = x.datosPorMes
          this.totalPorDia = x.totalCasos
          this.datosInput = x.datos


          this.totalDiaDato = x.totalDia.totalDia
          this.fechaDiaDato = x.totalDia.fechaDia
          this.yearFilter.push(this.yearsInput[this.yearsInput.length-1])
          let mesesFilterYear = this.datosPorMesInput.filter(x => this.yearFilter.indexOf(parseInt(x.year)) > -1)
          this.mesesSelect = Array.from(new Set(mesesFilterYear.map(x => {
            return x.MesDate + ' - ' + x.year;
          })))
          this.getYear(this.yearFilter, true)
          this.meses = this.datosPorMesInput

          this.sortMounth()



          this.mostrarBotoMes = true;



          this.mostrarAno = true;
          this.mostrarMes = false;
          this.datosOk = true;
          this.mesesOk = true
          this.buttonMonths = true

        }

      }
    )


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

  ngAfterContentInit() {







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
      if (this.filtrosMonth) {
        for (let filtro of this.filtrosMonth) {
          this.filterMonth(this.datosPorMesInput.filter(x => x.MesDate + ' - ' + x.year == filtro), filtro)
        }
      }
    }
    else {
      this.mostrarAno = true;
      this.mostrarMes = false;
    }
  }


  getYear(event, accion) {
    if (accion) {
      this.mesesOk = false
      this.buttonMonths = false
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
    if (this.filtrosYears) {
      for (let filtro of this.filtrosYears) {
        this.filterYears(this.datosInput.filter(x => x[2] == filtro),filtro)
         if (this.datosPorMesInput) {
          let mesesFilterYear = this.datosPorMesInput.filter(x => x.year == filtro)
          if (this.mesesSelect.length > 0) {
            this.mesesSelect = [...this.mesesSelect, ...Array.from(new Set(mesesFilterYear.map(x => {
              return x.MesDate + ' - ' + x.year;
            })))]
          }
          else {
            this.mesesSelect = Array.from(new Set(mesesFilterYear.map(x => {
              return x.MesDate + ' - ' + x.year;
            })))
          }

        }
        this.sortMounth()
        this.mesesOk = true
        this.buttonMonths = true
      }
    }



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
    this.optionsMonth = []
    if (this.filtrosMonth) {
      for (let filtro of this.filtrosMonth) {
        this.filterMonth(this.datosPorMesInput.filter(x => x.MesDate + ' - ' + x.year == filtro), filtro)
      }
    }



  }
  filterMonth(datos,  month) {

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
    this.optionsMonth[this.optionsMonth.length] = optionCount
    this.datosMesOk = true;
  }

  filterYears(datos, year) {

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
    this.optionsYear[this.optionsYear.length] = optionCount
    this.datosYearOk = true;
    console.log(this.optionsYear)
  }
  onDeSelectAllMonthFunct($event) {
    this.filtrosMonth = []
    this.optionsMonth = []
  }

  onSelectAllMonthFunct($event) {

   this.filtrosMonth = []
    for (let filtro of this.mesesSort) {
      this.filterMonth(this.datosPorMesInput.filter(x => x.MesDate + ' - ' + x.year == filtro), filtro)
      var index = this.filtrosMonth.indexOf(filtro);
      if (index == -1) {
        this.filtrosMonth.push(filtro)
      }

    }


  }
  onDeSelectAllYearFunct($event) {
    this.filtrosYears = []
    this.optionsYear = []
    this.mesesOk = false
    this.buttonMonths = false
  }

  onSelectAllYearFunct($event) {

   this.filtrosYears = []
    for (let filtro of this.yearsInput) {
      this.filterYears(this.datosInput.filter(x => x[2] == filtro), filtro)
        if (this.datosPorMesInput) {
          let mesesFilterYear = this.datosPorMesInput.filter(x => x.year == filtro)
          if (this.mesesSelect.length > 0) {
            this.mesesSelect = [...this.mesesSelect, ...Array.from(new Set(mesesFilterYear.map(x => {
              return x.MesDate + ' - ' + x.year;
            })))]
          }
          else {
            this.mesesSelect = Array.from(new Set(mesesFilterYear.map(x => {
              return x.MesDate + ' - ' + x.year;
            })))
          }

        }
        this.sortMounth()
        this.mesesOk = true
        this.buttonMonths = true
        var index = this.filtrosYears.indexOf(filtro);
        if (index == -1) {
        this.filtrosYears.push(filtro)
        }

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
