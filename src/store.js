import {configureStore} from '@reduxjs/toolkit';
import {weatherReducer} from './slices/weatherSlice';
import settingsReducer from './slices/settingSlice';
import unitReducer from './slices/unitSlice';

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
        settings: settingsReducer,
        unit: unitReducer,
    },
});
