import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { FavoritesActions } from './favorites.actions';

@Injectable()
export class FavoritesEffects {
  loadFavoritess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoritesActions.loadFavoritess),
      concatMap(() =>
        EMPTY.pipe(
          map((data) => FavoritesActions.loadFavoritess({ favoritess: data })),
          catchError((error) =>
            of(FavoritesActions.loadFavoritess({ favoritess: [] }))
          )
        )
      )
    );
  });

  constructor(private actions$: Actions) {}
}
