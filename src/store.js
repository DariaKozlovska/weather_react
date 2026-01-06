import {configureStore} from '@reduxjs/toolkit';
import {weatherReducer} from './slices/weatherSlice';
import settingsReducer from './slices/settingSlice';
import unitReducer from './slices/unitSlice';
import favoritesReducer from './slices/favoritesSlice';
import { saveToLocalStorage } from './utils/localStorage';

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
        settings: settingsReducer,
        favorites: favoritesReducer,
        unit: unitReducer,
    },
});

store.subscribe(() => {
  const state = store.getState();

  saveToLocalStorage('favorites', state.favorites.cities);
  saveToLocalStorage('unit', state.unit.unit);
});