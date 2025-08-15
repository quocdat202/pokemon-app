import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { PokemonActions } from './pokemon.actions';

@Injectable()
export class PokemonEffects {
  loadPokemons$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonActions.loadPokemons),
      concatMap(() =>
        EMPTY.pipe(
          map((data) => PokemonActions.loadPokemonsSuccess({ data })),
          catchError((error) =>
            of(PokemonActions.loadPokemonsFailure({ error }))
          )
        )
      )
    );
  });

  constructor(private actions$: Actions) {}
}
