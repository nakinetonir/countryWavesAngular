import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from './actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { FormularioService } from '../formulario.service';
import { of } from 'rxjs';
//Mutación de los stados y uso del servicio formulario.service
@Injectable()
export class FormularioEffects {

    constructor(
        private actions$: Actions,
        private _fs: FormularioService
    ){}


    getPrediccion$ = createEffect(
      () => this.actions$.pipe(
          ofType( actions.getPrediccion ),
          mergeMap(
              ( action ) => this._fs.getPrediction(action.datos)
                  .pipe(
                      map( prediccion => actions.getPrediccionSuccess({ prediccion }) ),
                      catchError( err => of(actions.getPrediccionError({ payload: err })) )
                  )
          )
      )
  );

  getVariables$ = createEffect(
    () => this.actions$.pipe(
        ofType( actions.getVariables ),
        mergeMap(
            ( action ) => this._fs.getVariables()
                .pipe(
                    map( variables => actions.getVariablesSuccess({variables}) ),
                    catchError( err => of(actions.getVariablesError({ payload: err })) )
                )
        )
    )
);

}
