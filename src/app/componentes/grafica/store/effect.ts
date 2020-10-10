import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from './actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { GraficaService } from '../grafica.service';
import { of } from 'rxjs';

@Injectable()
export class GraficasEffects {
// Mutacion de los datos de la grafica en base al filtro elegido
    constructor(
        private actions$: Actions,
        private _gs: GraficaService
    ){}


    getData$ = createEffect(
        () => this.actions$.pipe(
            ofType( actions.getData ),
            mergeMap(
                ( action ) =>this._gs.getDatos(action.grafica)
                    .pipe(
                        map( datos => actions.getDataSuccess({datos}) ),
                        catchError( err => of(actions.getDataError({ payload: err })) )
                    )
            )
        )
    );


}
