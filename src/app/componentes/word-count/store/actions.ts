import { createAction, props } from '@ngrx/store';

export const GetWordCount = createAction(
  '[GetWordCount] Get Word Count',
);

export const GetWordCountSuccess = createAction(
    '[GetWordCountSuccess] Get Word Count Success',
    props<{ datos: any }>()
);

export const GetWordCountError = createAction(
    '[GetWordCountError] Get Word Count Error',
    props<{ payload: any }>()
);

export const PostFiltroTuit = createAction(
  '[PostFiltroTuit] Post Filtro Tuit ',
  props<{ filtro: any }>()
);

export const PostFiltroTuitSuccess = createAction(
    '[PostFiltroTuitSuccess] Post Filtro Tuit Success',
);

export const PostFiltroTuitError = createAction(
    '[PostFiltroTuitError] Post Filtro Tuit Error',
    props<{ payload: any }>()
);
