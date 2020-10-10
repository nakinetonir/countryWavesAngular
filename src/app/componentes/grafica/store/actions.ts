import { createAction, props } from '@ngrx/store';
//Acciones para cargar los datos de la grafica mediante el filtro enviado
export const getData = createAction(
  '[GetData] Get Data',
  props<{ grafica: any }>()
);

export const getDataSuccess = createAction(
    '[GetData] Get Data Success',
    props<{ datos: any }>()
);

export const getDataError = createAction(
    '[GetData] Get Data Error',
    props<{ payload: any }>()
);


