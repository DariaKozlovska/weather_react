import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import logger from 'redux-logger';
import { weatherReducer } from './slices/weatherSlice';

const rootReducer = combineReducers({
  weather: weatherReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    import.meta.env.VITE_WEATHER_API_KEY
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware(),
});

setupListeners(store.dispatch);

export { store };