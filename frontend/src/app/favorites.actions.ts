import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Favorites } from './favorites.model';

export const FavoritesActions = createActionGroup({
  source: 'Favorites/API',
  events: {
    'Load Favoritess': props<{ favoritess: Favorites[] }>(),
    'Add Favorites': props<{ favorites: Favorites }>(),
    'Upsert Favorites': props<{ favorites: Favorites }>(),
    'Add Favoritess': props<{ favoritess: Favorites[] }>(),
    'Upsert Favoritess': props<{ favoritess: Favorites[] }>(),
    'Update Favorites': props<{ favorites: Update<Favorites> }>(),
    'Update Favoritess': props<{ favoritess: Update<Favorites>[] }>(),
    'Delete Favorites': props<{ id: string }>(),
    'Delete Favoritess': props<{ ids: string[] }>(),
    'Clear Favoritess': emptyProps(),
  }
});
