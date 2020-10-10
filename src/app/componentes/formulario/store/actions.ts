// store para cargar el formulario dinamico y enviar los datos y recibir la predicción
import { createAction, props } from '@ngrx/store';
export const getPrediccion = createAction(
  '[GetPrediccion] Get Prediccion',
  props<{ datos: any }>()
);

export const getPrediccionSuccess = createAction(
    '[GetPrediccion] Get Prediccion Success',
    props<{ prediccion: any }>()
);

export const getPrediccionError = createAction(
    '[GetPrediccion] Get Prediccion Error',
    props<{ payload: any }>()
);
export const getVariables = createAction(
  '[GetVariables] Get Variables',
);

export const getVariablesSuccess = createAction(
    '[GetVariablesSuccess] Get Variables Success',
    props<{variables: any}>()
);

export const getVariablesError = createAction(
    '[GetVariablesError] Get Variables Error',
    props<{ payload: any }>()
);
