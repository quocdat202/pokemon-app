import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Pokemon } from './pokemon.model';
import { PokemonActions } from './pokemon.actions';

export const pokemonsFeatureKey = 'pokemons';

export interface State extends EntityState<Pokemon> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Pokemon> = createEntityAdapter<Pokemon>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(PokemonActions.addPokemon,
    (state, action) => adapter.addOne(action.pokemon, state)
  ),
  on(PokemonActions.upsertPokemon,
    (state, action) => adapter.upsertOne(action.pokemon, state)
  ),
  on(PokemonActions.addPokemons,
    (state, action) => adapter.addMany(action.pokemons, state)
  ),
  on(PokemonActions.upsertPokemons,
    (state, action) => adapter.upsertMany(action.pokemons, state)
  ),
  on(PokemonActions.updatePokemon,
    (state, action) => adapter.updateOne(action.pokemon, state)
  ),
  on(PokemonActions.updatePokemons,
    (state, action) => adapter.updateMany(action.pokemons, state)
  ),
  on(PokemonActions.deletePokemon,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(PokemonActions.deletePokemons,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(PokemonActions.loadPokemons,
    (state, action) => adapter.setAll(action.pokemons, state)
  ),
  on(PokemonActions.clearPokemons,
    state => adapter.removeAll(state)
  ),
);

export const pokemonsFeature = createFeature({
  name: pokemonsFeatureKey,
  reducer,
  extraSelectors: ({ selectPokemonsState }) => ({
    ...adapter.getSelectors(selectPokemonsState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = pokemonsFeature;
