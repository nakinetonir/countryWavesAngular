import { Component, OnInit,  Input } from '@angular/core';
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
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {
  highcharts: typeof Highcharts = Highcharts;
  datosOk: boolean = false
  datosString
  conf
  @Input() set datos (datos) {
    if(datos && this.configuracion) {
      this.datosString = datos;
      this.configuracion.series[0].data = this.datosString;
      this.datosOk = true;
    }
  }
  get datos() {
    return this.datos;
  }

  @Input() configuracion

  constructor() { }

  ngOnInit() {
  }
  confData()
  {
       if(this.conf && this.datosString)
       {
        this.conf.series[0].data = this.datosString;
       }
  }

}
