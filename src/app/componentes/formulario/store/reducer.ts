import { Action, createReducer, on } from '@ngrx/store';
import * as FormularioActions from './actions';

// tslint:disable-next-line: class-name
export interface formularioState {
    datos: any;
    prediccion: number;
    loaded: boolean;
    loading: boolean;
    error: any;
    variables: any;
}
//Reducer para recibir el formulario dinamico y enviar datos para obtener la predicción
export const initialFormularioState: formularioState = {
    datos   : null,
    prediccion : null,
    loaded : false,
    loading: false,
    error  : null,
    variables: null,
  };

const FormularioReducer = createReducer(
  initialFormularioState,
    on(FormularioActions.getPrediccion, (state, { datos}) => ({
      ...state,
      loading: true,
      datos : { ...datos}
    })),


    on(FormularioActions.getPrediccionSuccess, (state, { prediccion }) => ({
      ...state,
      loading: false,
      loaded: true,
      prediccion: { ...prediccion }})),


    on(FormularioActions.getPrediccionError, (state , {payload}) => ({  ...state,
      loading: false,
      loaded: false,
      error: {
          url: payload.url,
          name: payload.name,
          message: payload.message
      }
    })),

    on(FormularioActions.getVariables, state => ({
      ...state,
      loading: true,

    })),

    on(FormularioActions.getVariablesSuccess, (state, { variables }) => ({
      ...state,
      loading: false,
      loaded: true,
      variables : { ...variables
      },
    })),

    on(FormularioActions.getVariablesError, (state,  {payload}) => ({
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

export function FormularioReducerExport(state, action) {
    return FormularioReducer(state, action);
  }
