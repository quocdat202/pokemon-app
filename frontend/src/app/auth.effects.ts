import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  loadAuths$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadAuths),
      concatMap(() =>
        EMPTY.pipe(
          map((data) => AuthActions.loadAuthsSuccess({ data })),
          catchError((error) => of(AuthActions.loadAuthsFailure({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions) {}
}
