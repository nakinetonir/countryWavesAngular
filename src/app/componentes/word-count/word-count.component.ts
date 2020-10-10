import { Component, OnInit, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetWordCount } from './store/actions';
import { PostFiltroTuit } from './store/actions';
import { ICategory } from './interface/category_interface';
import { IData } from './interface/data_interface'
import { QueryParamsHandling} from '@angular/router/src/config';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GraficasComponent } from './graficas/graficas.component';



@Component({
  selector: 'app-word-count',
  templateUrl: './word-count.component.html',
  styleUrls: ['./word-count.component.css']
})
export class WordCountComponent implements OnInit, AfterViewInit {
  filtro = ""
  dataOk: boolean = false;
  listWordCountTotal: [][] = [];
  listListatodosbigrmTotal: string[][]= [];
  listListatodostrigrmTotal: string[][] = [];
  listWordCount: [][] = [];
  listListatodosbigrm: string[][]= [];
  listListatodostrigrm: string[][] = [];
  listTuits;
  componentRefCountWord : ComponentRef<GraficasComponent> = null
  componentRefCountWordTotal : ComponentRef<GraficasComponent> = null
  componentRefBigramas : ComponentRef<GraficasComponent> = null
  componentRefBigramasTotal : ComponentRef<GraficasComponent> = null
  componentRefTrigramas : ComponentRef<GraficasComponent> = null
  componentRefTrigramasTotal : ComponentRef<GraficasComponent> = null

  /*@ViewChild('componentRefCount', { read: ViewContainerRef }) compDynamicContainerCount: ViewContainerRef;
  @ViewChild('componentRefCountTotal', { read: ViewContainerRef }) compDynamicContainerCountTotal: ViewContainerRef;
  @ViewChild('componentRefBi', { read: ViewContainerRef }) compDynamicContainerBi: ViewContainerRef;
  @ViewChild('componentRefBiTotal', { read: ViewContainerRef }) compDynamicContainerBiTotal: ViewContainerRef;
  @ViewChild('componentRefTri', { read: ViewContainerRef }) compDynamicContainerTri: ViewContainerRef;
  @ViewChild('componentRefTriTotal', { read: ViewContainerRef }) compDynamicContainerTriTotal: ViewContainerRef;*/

  //Configuraciones de los tres histogramas del componente word-count
  chartOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Palabras mas repetidas en los tuits con la palabra coronavirus'
    },
    subtitle: {
      text: 'Api de Twitter'
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
        text: 'Nº de palabras entre los tuits'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Palabra'
    },
    series: [{
      name: 'WordCount',
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
   chartOptionsListatodosbigrm = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Bigramas mas repetidos en los tuits con la palabra coronavirus'
    },
    subtitle: {
      text: 'Api de Twitter'
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
        text: 'Nº de palabras entre los tuits'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Palabra'
    },
    series: [{
      name: 'WordCount',
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
  chartOptionsListatodostrigrm = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Trigramas mas repetidos en los tuits con la palabra coronavirus'
    },
    subtitle: {
      text: 'Api de Twitter'
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
        text: 'Nº de palabras entre los tuits'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Palabra'
    },
    series: [{
      name: 'WordCount',
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
  chartOptionsWorDataTotal = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Palabras mas repetidas en los tuits con la palabra coronavirus'
    },
    subtitle: {
      text: 'Api de Twitter'
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
        text: 'Nº de palabras entre los tuits'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Palabra'
    },
    series: [{
      name: 'WordCount',
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
  chartOptionsListatodosbigrmTotal = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Bigramas mas repetidos en los tuits con la palabra coronavirus'
    },
    subtitle: {
      text: 'Api de Twitter'
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
        text: 'Nº de palabras entre los tuits'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Palabra'
    },
    series: [{
      name: 'WordCount',
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
  chartOptionsListatodostrigrmTotal = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Trigramas mas repetidos en los tuits con la palabra coronavirus'
    },
    subtitle: {
      text: 'Api de Twitter'
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
        text: 'Nº de palabras entre los tuits'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Palabra'
    },
    series: [{
      name: 'WordCount',
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
  filtroGroup:FormGroup;
  uno:boolean = false;
  dos:boolean = false;
  tres:boolean =false
  cuatro: boolean = false
  spinner : boolean = false;
  inicio: boolean = false;
  constructor(private store: Store<any>,private formBuilder: FormBuilder, private resolver: ComponentFactoryResolver) {
    this.store.dispatch( GetWordCount() );
    this.filtroGroup = formBuilder.group({
      filtro: new FormControl("", {validators: Validators.required})
  })

  }

  ngOnInit() {

    this.mostrar(4);

    setInterval(() => {  this.store.dispatch( GetWordCount() ); }, 25000);

//Carga del estado wordCount, todos los datos para los tres histogramas
     this.store.subscribe( state => {
      console.log(state.wordCount.datos);
      if(state.wordCount.datos!=null && state.wordCount.datos.datos!=null)
      {
          this.dataOk = true;
          this.spinner = false;
          let wordCountTotal = state.wordCount.datos.datos.wordCountTotal;
          let listatodosbigrmTotal = state.wordCount.datos.datos.listatodosbigrmTotal;
          let listatodostrigrmTotal = state.wordCount.datos.datos.listatodostrigrmTotal;
          let wordCount = state.wordCount.datos.datos.wordCount;
          let listatodosbigrm = state.wordCount.datos.datos.listatodosbigrm;
          let listatodostrigrm = state.wordCount.datos.datos.listatodostrigrm;
          //let textTuits = state.wordCount.datos.datos.textTuits.toString();
          this.updateWordCount(wordCount);
          this.updateListatodosbigrm(listatodosbigrm);
          this.updateListatodostrigrm(listatodostrigrm);
          this.updateWordCountTotal(wordCountTotal);
          this.updateListatodosbigrmTotal(listatodosbigrmTotal);
          this.updateListatodostrigrmTotal(listatodostrigrmTotal);


          //this.couldWords(textTuits);

      }
      else if(state.error)
      {
        this.spinner = true;
      }
      else
      {
        this.spinner = true;
        this.listWordCountTotal = [];
        this.listListatodosbigrmTotal= [];
        this.listListatodostrigrmTotal = [];
        this.listWordCount= [];
        this.listListatodosbigrm= [];
        this.listListatodostrigrm = [];
        /*this.getRefCountWord([], this.componentRefCountWord, this.chartOptions,this.compDynamicContainerCount)
        this.getRefCountWord([], this.componentRefBigramas, this.chartOptionsListatodosbigrm,this.compDynamicContainerBi)
        this.getRefCountWord([], this.componentRefTrigramas, this.chartOptionsListatodostrigrm,this.compDynamicContainerTri)
        this.getRefCountWord([], this.componentRefCountWordTotal, this.chartOptionsWorDataTotal,this.compDynamicContainerCountTotal)
        this.getRefCountWord([], this.componentRefBigramasTotal, this.chartOptionsListatodosbigrmTotal,this.compDynamicContainerBiTotal)
        this.getRefCountWord([], this.componentRefTrigramasTotal, this.chartOptionsListatodostrigrmTotal,this.compDynamicContainerTriTotal)*/

      }

  })

  }

  ngAfterViewInit() {

  }
  mostrar(cual)
  {
      switch(cual)
      {
          case 1:
            this.uno = true
            this.dos = false
            this.tres = false
            this.cuatro = false
            break;
          case 2:
            this.uno = false
            this.dos = true
            this.tres = false
            this.cuatro = false
            break;
          case 3:
            this.uno = false
            this.dos = false
            this.tres = true
            this.cuatro = false
          break;
          case 4:
          this.uno = false
          this.dos = false
          this.tres = false
          this.cuatro = true
      }
  }


    async getRefCountWord(array, component, options, compyDynamic) {
    compyDynamic.clear();
    const { GraficasComponent } = await import('./graficas/graficas.component');
    component =compyDynamic.createComponent(
      this.resolver.resolveComponentFactory(GraficasComponent)
    );
    component.instance.conf = options
    component.instance.datosString = array
    component.instance.confData();
    component.instance.datosOk = true
  }

  updateWordCount(data) {
    this.listWordCount = []
    // tslint:disable-next-line: forin
    for (let i in data)
    {
      this.listWordCount.push(data[i]);
    }
    //this.getRefCountWord(array, this.componentRefCountWord, this.chartOptions,this.compDynamicContainerCount)






  }
  updateListatodosbigrm(data)
  {
    this.listListatodosbigrm = []
    // tslint:disable-next-line: forin
    for (let i in data)
    {
        let arrayStgring : string[] = [];
        arrayStgring.push(data[i][0].toString())
        arrayStgring.push(data[i][1])
        this.listListatodosbigrm.push(arrayStgring);
    }
    //this.getRefCountWord(array, this.componentRefBigramas, this.chartOptionsListatodosbigrm,this.compDynamicContainerBi)

    //this.chartOptionsListatodosbigrm.series[0].data = this.listListatodosbigrm;
  }
  updateListatodostrigrm(data)
  {
    this.listListatodostrigrm = []
    // tslint:disable-next-line: forin
    for (let i in data)
    {
        let arrayStgring : string[] = [];
        arrayStgring.push(data[i][0].toString())
        arrayStgring.push(data[i][1])
        this.listListatodostrigrm.push(arrayStgring);
    }
    //this.getRefCountWord(array, this.componentRefTrigramas, this.chartOptionsListatodostrigrm,this.compDynamicContainerTri)

  }
  updateWordCountTotal(data) {
    this.listWordCountTotal = [];
    // tslint:disable-next-line: forin
    for (let i in data)
    {
      this.listWordCountTotal.push(data[i]);
    }
    //this.getRefCountWord(array, this.componentRefCountWordTotal, this.chartOptionsWorDataTotal,this.compDynamicContainerCountTotal)





  }
  updateListatodosbigrmTotal(data)
  {
    this.listListatodosbigrmTotal = []
    // tslint:disable-next-line: forin
    for (let i in data)
    {
        let arrayStgring : string[] = [];
        arrayStgring.push(data[i][0].toString())
        arrayStgring.push(data[i][1])
        this.listListatodosbigrmTotal.push(arrayStgring);
    }
    //this.getRefCountWord(array, this.componentRefBigramasTotal, this.chartOptionsListatodosbigrmTotal,this.compDynamicContainerBiTotal)

  }
  updateListatodostrigrmTotal(data)
  {
    this.listListatodostrigrmTotal = [];
    // tslint:disable-next-line: forin
    for (let i in data)
    {
        let arrayStgring : string[] = [];
        arrayStgring.push(data[i][0].toString())
        arrayStgring.push(data[i][1])
        this.listListatodostrigrmTotal.push(arrayStgring);
    }
    //this.getRefCountWord(array, this.componentRefTrigramasTotal, this.chartOptionsListatodostrigrmTotal,this.compDynamicContainerTriTotal)

  }
  enviarFiltro()
  {
    let filtro = this.filtroGroup.get('filtro').value;
    this.store.dispatch( PostFiltroTuit({filtro}) );
    this.mostrar(1)

  }

}

