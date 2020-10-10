import { Action, createReducer, on } from '@ngrx/store';
import * as WordCountActions from './actions';

// tslint:disable-next-line: class-name
export interface wordCountState {
    datos: any;
    loaded: boolean;
    loading: boolean;
    error: any;
    grafica: any;
    filtro: any;
}


export const initialWordCountState: wordCountState = {
    datos   : null,
    loaded : false,
    loading: false,
    error  : null,
    grafica: null,
    filtro: null
  };

const wordCountReducer = createReducer(
  initialWordCountState,
    on(WordCountActions.GetWordCount, (state) => ({
      ...state,
      loading: true

    })),

    on(WordCountActions.GetWordCountSuccess, (state, { datos }) => ({
      ...state,
      loading: false,
      loaded: true,
      datos : { ...datos
      }})),

    on(WordCountActions.GetWordCountError, (state,  {payload}) => ({
      ...state,
      loading: false,
      loaded: false,
      error: {
          url: payload.url,
          name: payload.name,
          message: payload.message
      }
    })),


    on(WordCountActions.PostFiltroTuit, (state, {filtro}) => ({
      ...state,
      filtro,
      loading: true

    })),

    on(WordCountActions.PostFiltroTuitSuccess, (state) => ({
      ...state,
      loading: false,
      loaded: true
      })),

    on(WordCountActions.PostFiltroTuitError, (state,  {payload}) => ({
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

export function reducerWordCountExport(state: wordCountState, action: Action) {
    return wordCountReducer(state, action);
  }
