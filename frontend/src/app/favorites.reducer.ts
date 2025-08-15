import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Favorites } from './favorites.model';
import { FavoritesActions } from './favorites.actions';

export const favoritesesFeatureKey = 'favoriteses';

export interface State extends EntityState<Favorites> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Favorites> = createEntityAdapter<Favorites>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(FavoritesActions.addFavorites,
    (state, action) => adapter.addOne(action.favorites, state)
  ),
  on(FavoritesActions.upsertFavorites,
    (state, action) => adapter.upsertOne(action.favorites, state)
  ),
  on(FavoritesActions.addFavoritess,
    (state, action) => adapter.addMany(action.favoritess, state)
  ),
  on(FavoritesActions.upsertFavoritess,
    (state, action) => adapter.upsertMany(action.favoritess, state)
  ),
  on(FavoritesActions.updateFavorites,
    (state, action) => adapter.updateOne(action.favorites, state)
  ),
  on(FavoritesActions.updateFavoritess,
    (state, action) => adapter.updateMany(action.favoritess, state)
  ),
  on(FavoritesActions.deleteFavorites,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(FavoritesActions.deleteFavoritess,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(FavoritesActions.loadFavoritess,
    (state, action) => adapter.setAll(action.favoritess, state)
  ),
  on(FavoritesActions.clearFavoritess,
    state => adapter.removeAll(state)
  ),
);

export const favoritesesFeature = createFeature({
  name: favoritesesFeatureKey,
  reducer,
  extraSelectors: ({ selectFavoritesesState }) => ({
    ...adapter.getSelectors(selectFavoritesesState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = favoritesesFeature;
