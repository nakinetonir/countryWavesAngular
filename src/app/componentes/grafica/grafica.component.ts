import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getData } from './store/actions'
import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
interface IGrafica {
  label: string;
  simbolo: string;
}
@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit, AfterViewInit {
  graficaConstante = 'area_parcela';
  graficaSelect: IGrafica;

  graficas: { [id: string]: IGrafica; } = {
    area_parcela: { label: 'Area parcela', simbolo: 'm' },
    n_chimeneas: { label: 'Nº Chimeneas', simbolo: 'nº' },
    n_cocinas: { label: 'Nº Cocinas', simbolo: 'nº' },
    n_dormitorios_sobre_suelo: { label: 'Nº Dormitorios', simbolo: 'nº' },
    area_habitable_sobre_suelo: { label: 'Area habitable', simbolo: 'm2' },
    calidad_general: { label: 'Calidad', simbolo: ':)' },
  };
  highcharts = Highcharts;
  valorY;
  datosOk: boolean = false
  //Carga la configuración del plot
  chartOptions = {
    chart: {
      type: 'scatter',
      zoomType: 'xy'
    },
    title: {
      text: 'Precios por '
    },
    subtitle: {
      text: 'Iñaki  Moneo Arau'
    },
    xAxis: {
      title: {
        enabled: true,
        text: 'Precio'
      },
      startOnTick: true,
      endOnTick: true,
      showLastLabel: true
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      x: 100,
      y: 70,
      floating: true,
      backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
      borderWidth: 1
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 5,
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgb(100,100,100)'
            }
          }
        },
        states: {
          hover: {
            marker: {
              enabled: false
            }
          }
        },
        tooltip: {
          headerFormat: '<b>{series.name}</b><br>',
          pointFormat: '{point.x} €, {point.y} '
        }
      }
    },
    series: [{
      name: 'Precio',
      color: '#008B8B',
      data: []

    }]
  };
  constructor(private store: Store<any>) {
    this.graficaSelect = this.graficas[this.graficaConstante];
    this.store.subscribe(state => {
      if (state.grafica.datos != null) {
        let datosXArray = state.grafica.datos[1] as Array<any>;
        let datosYArray = state.grafica.datos[0] as Array<any>;
        this.updateData(datosXArray, datosYArray);
        //Math.max.apply(Math, array.map(function(o) { return o.y; }))
      }

      let varLabel

    })


    //Object.assign(this, { multi })
  }

  ngOnInit() {
    let grafica = this.graficaConstante
    this.cargarLabels(grafica);
    this.store.dispatch(getData({ grafica }));
  }

  ngAfterViewInit() {
    sessionStorage.setItem("formularioCargado", null)
  }
  //Carga la gráfica en función al filtro.
  getGrafica(grafica) {
    this.cargarLabels(grafica);
    this.store.dispatch(getData({ grafica }));

  }


  cargarLabels(id) {
    this.graficaSelect = this.graficas[id]
    if (this.graficaSelect != undefined) {
      this.chartOptions.title.text = 'Precios por ' + this.graficaSelect.label.toLowerCase();
      this.chartOptions.yAxis.title.text = this.graficaSelect.label;
      this.chartOptions.plotOptions.scatter.tooltip.pointFormat = '{point.x} €, {point.y} ' + this.graficaSelect.simbolo;
    }

  }
  //Actuliza los datos mostrado en la gráfica
  updateData(x, y) {
    if (x.length != undefined) {
      const zip = (x, y) => x.map((k, i) => [k, y[i]]);
      this.chartOptions.series[0].data = zip(x, y);
      this.datosOk = true;
    }


  }

}
