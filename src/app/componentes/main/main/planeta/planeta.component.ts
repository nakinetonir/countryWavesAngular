import { Component, OnInit, Output, Input, EventEmitter, HostListener } from '@angular/core';
import { MainService } from '../main.service'

import * as Highcharts from "highcharts/highmaps";
import { Options } from "highcharts";
//import worldMap from "@highcharts/map-collection/custom/world.geo.json";
//import * as Highcharts from 'highcharts';

declare var require: any;
let worldMap = require('@highcharts/map-collection/custom/world.geo.json');


@Component({
  selector: 'app-planeta',
  templateUrl: './planeta.component.html',
  styleUrls: ['./planeta.component.scss']
})
export class PlanetaComponent implements OnInit {
  datosOk: boolean = false
  codesIncidenceInput
  selectDate
  @Output() country = new EventEmitter(null)
  @Output() spinner = new EventEmitter(false)

  @Input() dates

  @Input() set codesIncidence(value) {
    if (value) {
      this.codesIncidenceInput = value
      this.loadCodesIncidence(this.codesIncidenceInput)
    }
  }
  get codesIncidence() {
    return this.codesIncidenceInput;
  }

  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "mapChart";
  chartData = [{ code3: "ABW", z: 105 }, { code3: "AFG", z: 35530 }];

  chartOptions = {
    chart: {
      map: worldMap as any
    },
    title: {
      text: "Covid cases in the world"
    },
    subtitle: {
      text:
        'Click on the country'
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        alignTo: "spacingBox"
      }
    },

    legend: {
      enabled: true
    },
    colorAxis: {
      min: 0
    },
    series: [
      {
        type: "map",
        name: "Random data",
        states: {
          hover: {
            color: "#BADA55"
          }
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}"
        },
        allAreas: false,
        data: [
        ]
      }
    ]
  };

  constructor(private _ms: MainService) { }

  ngOnInit(): void {

  }
  selectCountry(event) {
    if (event.point && event.point.name && event.point.name == "United States of America") {
      this.country.next('US')
    }
    else if (event.point && event.point.name) {
      this.country.next(event.point.name)
    }

  }
  loadCodesIncidence(codes) {
    //let datosXArray = codes.datos[1] as Array<any>;
    //let datosYArray = codes.grafica.datos[0] as Array<any>;
    // this.updateData(datosXArray, datosYArray);
    this.chartOptions.series[0].data = codes
    this.datosOk = true
  }

  updateData(x, y) {
    if (x.length != undefined) {
      const codes = (x, y) => x.map((k, i) => [k, y[i]]);
      //this.chartOptions.data = codes(x, y);
      this.datosOk = true;
    }


  }

  codesProcess(codes, countries) {
    let listadoCodes = []
    // tslint:disable-next-line: forin
    for (let i in codes) {
      let arrayString: any[] = [];
      arrayString.push(codes[i])
      arrayString.push(Math.round(parseInt(countries[i])))
      listadoCodes.push(arrayString)
    }
    this.loadCodesIncidence(listadoCodes)
  }


  changeDate() {

    if (this.selectDate) {
      this.spinner.next(true)
      let month = this.selectDate.split('-')[0].trim()
      let year = this.selectDate.split('-')[1].trim()
      this._ms.postIncidenciaInCountriesByDate(month, year).subscribe(
        x => {
          let incidenciaInCountries = JSON.parse(x["incidenciaInCountriesByDate"])
          let incidenciaInCountriesCodes = incidenciaInCountries.Code
          let incidenciaInCountriesCountry = incidenciaInCountries.incidencia
          this.codesProcess(incidenciaInCountriesCodes, incidenciaInCountriesCountry)
          this.spinner.next(false)
        },
        error => {
          this.spinner.next(false)
        }
      )
    }

  }



}

