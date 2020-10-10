import { Action, createReducer, on } from '@ngrx/store';
import * as GraficaActions from './actions';

// tslint:disable-next-line: class-name
export interface graficaState {
    datos: any;
    loaded: boolean;
    loading: boolean;
    error  : any;
    grafica: any;
}


export const initialGraficaState: graficaState = {
    datos   : null,
    loaded : false,
    loading: false,
    error  : null,
    grafica: null
  };

const graficaReducer = createReducer(
    initialGraficaState,
    on(GraficaActions.getData, (state, {grafica}) => ({
      ...state,
      grafica : {...grafica},
      loading: true

    })),

    on(GraficaActions.getDataSuccess, (state, { datos }) => ({
      ...state,
      loading: false,
      loaded: true,
      datos : { ...datos
      }})),

    on(GraficaActions.getDataError, (state,  {payload}) => ({
      ...state,
      loading: false,
      loaded: false,
      error: {
          url: payload.url,
          name: payload.name,
          message: payload.message
      }
    }))

  );

export function reducerGraficaExport(state: graficaState, action: Action) {
    return graficaReducer(state, action);
  }
