import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from './actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { WordCountService } from '../word-count.service';
import { of } from 'rxjs';

@Injectable()
export class WordCountEffects {

    constructor(
        private actions$: Actions,
        private _wcs: WordCountService
    ){}


    GetWordCount$ = createEffect(
        () => this.actions$.pipe(
            ofType( actions.GetWordCount ),
            mergeMap(
                ( action ) => this._wcs.getWordCount()
                    .pipe(
                        map( datos => actions.GetWordCountSuccess({datos}) ),
                        catchError( err => of(actions.GetWordCountError({ payload: err })) )
                    )
            )
        )
    );

    PostFiltroTuit$ = createEffect(
      () => this.actions$.pipe(
          ofType( actions.PostFiltroTuit ),
          mergeMap(
              ( action ) => this._wcs.postFiltroTuit(action.filtro)
                  .pipe(
                      map( datos => actions.PostFiltroTuitSuccess() ),
                      catchError( err => of(actions.PostFiltroTuitError({ payload: err })) )
                  )
          )
      )
  );


}
