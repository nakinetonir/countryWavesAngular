import { Component, OnInit, Output, Input,EventEmitter, HostListener} from '@angular/core';


import * as Highcharts from "highcharts/highmaps";
import { Options } from "highcharts";
//import worldMap from "@highcharts/map-collection/custom/world.geo.json";
//import * as Highcharts from 'highcharts';

declare var require: any;
let worldMap = require('@highcharts/map-collection/custom/world.geo.json');


@Component({
  selector: 'app-planeta',
  templateUrl: './planeta.component.html',
  styleUrls: ['./planeta.component.sass']
})
export class PlanetaComponent implements OnInit {
  datosOk : boolean = false
  codesIncidenceInput
  @Output() country = new EventEmitter(null)

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

  constructor() { }

  ngOnInit(): void {

  }
  selectCountry(event)
  {
     if(event.point && event.point.name && event.point.name == "United States of America")
      {
          this.country.next('US')
      }
      else if(event.point && event.point.name)
      {
          this.country.next(event.point.name)
      }

  }
  loadCodesIncidence(codes)
  {
    //let datosXArray = codes.datos[1] as Array<any>;
    //let datosYArray = codes.grafica.datos[0] as Array<any>;
    console.log(codes)
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



  }

