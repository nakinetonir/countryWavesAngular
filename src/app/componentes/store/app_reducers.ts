import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './index_reducers';
//Reducers global de toda la app con sus estados

export interface AppState {
   formulario: reducers.formularioState,
   grafica: reducers.graficaState,
   wordCount: reducers.wordCountState;
}



export const appReducers: ActionReducerMap<AppState> = {
   formulario: reducers.FormularioReducerExport,
   grafica: reducers.reducerGraficaExport,
   wordCount: reducers.reducerWordCountExport
}
