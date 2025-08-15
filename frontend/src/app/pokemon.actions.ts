import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Pokemon } from './pokemon.model';

export const PokemonActions = createActionGroup({
  source: 'Pokemon/API',
  events: {
    'Load Pokemons': props<{ pokemons: Pokemon[] }>(),
    'Add Pokemon': props<{ pokemon: Pokemon }>(),
    'Upsert Pokemon': props<{ pokemon: Pokemon }>(),
    'Add Pokemons': props<{ pokemons: Pokemon[] }>(),
    'Upsert Pokemons': props<{ pokemons: Pokemon[] }>(),
    'Update Pokemon': props<{ pokemon: Update<Pokemon> }>(),
    'Update Pokemons': props<{ pokemons: Update<Pokemon>[] }>(),
    'Delete Pokemon': props<{ id: string }>(),
    'Delete Pokemons': props<{ ids: string[] }>(),
    'Clear Pokemons': emptyProps(),
    'Load Pokemons Success': props<{ data: any }>(),
    'Load Pokemons Failure': props<{ error: any }>(),
  },
});
