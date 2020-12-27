import { Component, OnInit,Input } from '@angular/core';
import * as Highcharts from 'highcharts';

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
  datosOk: boolean = false
  highcharts: typeof Highcharts = Highcharts;
  meses
  mesesArray
  options = []
  mostrarAno :boolean = true;
  mostrarMes : boolean = false;
  mostrarBotoMes : boolean = false;
  totalDeCasos
  totalPorDia
  fechaDiaDato
  totalDiaDato
  @Input() set datos (datos) {
    if(datos) {
      this.chartOptions.series[0].data = datos;
      this.mostrarAno = true;
      this.mostrarMes = false;
      this.datosOk = true;
    }
  }
  get datos() {
    return this.datos;
  }

  @Input() set totalDia(total) {
    if(total)
    {
        this.totalPorDia = total
        this.totalDiaDato = this.totalPorDia.totalDia
        this.fechaDiaDato = this.totalPorDia.fechaDia
    }
  }

  get totalDia() {
    return this.totalDia
  }

  @Input() set datosPorMes (datosPorMes) {
    if(datosPorMes) {
      if(datosPorMes.length>0)
      this.mostrarBotoMes = true;
      for (let op in datosPorMes)
      {
        let opciones = this.getOptions();
        opciones.series[0].data = datosPorMes[op];
        this.options[op] = opciones
      }
      this.meses = datosPorMes
      //this.chartOptions.series[0].data = datos;
      //this.datosOk = true;
    }
  }
  get datosPorMes() {
    return this.datosPorMes;
  }

  @Input() set close (close) {
    if(close) {
      this.mostrarAno = true;
      this.mostrarMes = false;
    }
  }
  get close() {
    return this.close;
  }
  @Input() set mesesFor (meses) {
    if(meses) {
     this.mesesArray = meses
     if(this.options)
     {
      for (let op in this.mesesArray)
      {
        this.options[op].title.text = this.mesesArray[op];
      }
     }

    }
  }
  get mesesFor() {
    return this.mesesArray;
  }

  @Input() set totalCasos (totalCasos) {
    if(totalCasos) {
     this.totalDeCasos = totalCasos
     this.chartOptions.title.text = "El total de casos actualizado: "+this.totalDeCasos
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
        format: '{point.y:.1f}', // one decimal
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
  }
  getOptions()
  {
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
            format: '{point.y:.1f}', // one decimal
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
  mostrar(mostrar)
  {
      if(mostrar == "mes")
      {
          this.mostrarMes = true;
          this.mostrarAno = false;
      }
      else
      {
          this.mostrarAno = true;
          this.mostrarMes = false;
      }
  }
}
